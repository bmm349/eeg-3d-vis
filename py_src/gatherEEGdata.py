import time
import numpy as np
import pandas as pd
import pylsl
import threading
import zmq
import eeg_payload_pb2 as Message
from abc import ABC, abstractmethod
from processing import calculate_power_bands
import threading
import os


class DataHandler(ABC):
    @abstractmethod
    def __init__(self, sensor_type='eeg', port=1331):
        raise Exception("Don't implement an abstract method")

    @abstractmethod
    def start(self):
        raise Exception("Dont implement an abstract method")

    @abstractmethod
    def stop(self):
        raise Exception("Dont implement an abstract method")


class EEGHandler(DataHandler):
    def __init__(self, sensor_type='eeg', port=1331, fromFile=False, filePath=None):
        print("Starting EEG Data Handler...")
        ctx = zmq.Context()
        self.sensor_type = sensor_type
        self.sock = ctx.socket(zmq.PUB)
        self.sock.setsockopt(zmq.SNDTIMEO, 1000)
        self.sock.setsockopt(zmq.LINGER, 1000)
        self.sock.setsockopt(zmq.IMMEDIATE, 1)
        self.sock.bind(f"tcp://127.0.0.1:{port}")
        self.fromFile = fromFile
        if (not fromFile):
            self.current_lsl_streams = pylsl.resolve_byprop(
                'type', 'EEG', timeout=5)
            print(type(self.current_lsl_streams))
        else:
            self.filePath = filePath
        print("Started!")
        if self.sensor_type == 'eeg':
            # Set our data type to our chunk
            self.dtype = EEGDataChunk(4, 12, None)
        else:
            print("other types are not implemented...")

    def start(self, loop=False):
        if(not self.fromFile):
            self.inlet = pylsl.StreamInlet(
                self.current_lsl_streams[0], max_chunklen=getattr(self.dtype, 'maxchunklen'))
        # assert(getattr(self.dtype, 'n_channels') == self.inlet.info().channel_count())
        # print("Starting any threads necessary...")
        if (self.fromFile):
            # do file reading and looping here.
            # Simulate file reading at a certain hz
            # FIXME: Change to actually take in a variable sample rate
            with open(self.filePath, 'rb') as f:
                sample_rate = 256
                n_seconds = 10
                ll = os.popen("tail -n 1 %s" % self.filePath).read()
                t = threading.currentThread()
                data_batch = []
                data_pd = pd.read_csv(self.filePath)
                max_len = len(data_pd)
                counter = 0
                while getattr(t, 'do_run', True):
                    time.sleep(0.00390625)
                    while(len(data_batch) < sample_rate*n_seconds):
                        data_batch.append(data_pd.iloc[counter])
                        counter = counter + 1
                    tp9 = []
                    af7 = []
                    af8 = []
                    tp10 = []
                    for data in data_batch:
                        tp9.append(data.loc['TP9'])
                        af7.append(data.loc['AF7'])
                        af8.append(data.loc['AF8'])
                        tp10.append(data.loc['TP10'])
                    tp9 = np.asarray(tp9).astype(np.float)
                    af7 = np.asarray(af7).astype(np.float)
                    af8 = np.asarray(af8).astype(np.float)
                    tp10 = np.asarray(tp10).astype(np.float)
                    pd_csv = pd.DataFrame(data=[af7, af8, tp9, tp10])
                    pd_csv.to_csv('eeg_recording_raw.csv', index=False)
                    # Calculate powerbands for all channels
                    dtp9, ttp9, atp9, betp9 = calculate_power_bands(tp9)
                    daf7, taf7, aaf7, beaf7 = calculate_power_bands(af7)
                    daf8, taf8, aaf8, beaf8 = calculate_power_bands(af8)
                    dtp10, ttp10, atp10, betp10 = calculate_power_bands(tp10)
                    for i in range(0, np.shape(atp9)[0]):
                        eeg_msg = Message.theme()
                        eeg_msg.meanAlphaTpNine = atp9[i]
                        eeg_msg.meanBetaTpNine = betp9[i]
                        eeg_msg.meanThetaTpNine = ttp9[i]
                        eeg_msg.meanDeltaTpNine = dtp9[i]

                        eeg_msg.meanAlphaTpTen = atp10[i]
                        eeg_msg.meanBetaTpTen = betp10[i]
                        eeg_msg.meanThetaTpTen = ttp10[i]
                        eeg_msg.meanDeltaTpTen = dtp10[i]

                        eeg_msg.meanAlphaAfSeven = aaf7[i]
                        eeg_msg.meanBetaAfSeven = beaf7[i]
                        eeg_msg.meanThetaAfSeven = taf7[i]
                        eeg_msg.meanDeltaAfSeven = daf7[i]

                        eeg_msg.meanAlphaAfEight = aaf8[i]
                        eeg_msg.meanBetaAfEight = beaf8[i]
                        eeg_msg.meanThetaAfEight = taf8[i]
                        eeg_msg.meanDeltaAfEight = daf8[i]

                        st = eeg_msg.SerializeToString()
                        self.sock.send(st)
                        print("Sent message!")
                data_batch = data_batch[sample_rate:len(data_batch)]
        else:
            # start muselsl piepline here.
            # data, ts = self.inlet.pull_chunk(timeout=1, max_samples=getattr(self.dtype, 'maxchunklen'))
            # print(len(data))
            # print(data)
            t = threading.currentThread()
            data_batch = []
            # TODO: Make these configurable
            sample_rate = 256
            n_seconds = 10
            while getattr(t, 'do_run', True):
                data, ts = self.inlet.pull_chunk(
                    timeout=1, max_samples=getattr(self.dtype, 'maxchunklen'))
                while(len(data_batch) < sample_rate*n_seconds):
                    data_batch.append(data)
                tp9 = []
                af7 = []
                af8 = []
                tp10 = []
                for data in data_batch:
                    for sample in data:
                        tp9.append(sample[0])
                        af7.append(sample[1])
                        af8.append(sample[2])
                        tp10.append(sample[3])
                tp9 = np.asarray(tp9).astype(np.float)
                af7 = np.asarray(af7).astype(np.float)
                af8 = np.asarray(af8).astype(np.float)
                tp10 = np.asarray(tp10).astype(np.float)
                pd_csv = pd.DataFrame(data=[af7, af8, tp9, tp10])
                pd_csv.to_csv('eeg_recording_raw.csv', index=False)
                # Calculate powerbands for all channels
                dtp9, ttp9, atp9, betp9 = calculate_power_bands(tp9)
                daf7, taf7, aaf7, beaf7 = calculate_power_bands(af7)
                daf8, taf8, aaf8, beaf8 = calculate_power_bands(af8)
                dtp10, ttp10, atp10, betp10 = calculate_power_bands(tp10)
                # print("Done computing power bands for 1/3 second")
                for i in range(0, np.shape(atp9)[0]):
                    eeg_msg = Message.theme()
                    eeg_msg.meanAlphaTpNine = atp9[i]
                    eeg_msg.meanBetaTpNine = betp9[i]
                    eeg_msg.meanThetaTpNine = ttp9[i]
                    eeg_msg.meanDeltaTpNine = dtp9[i]

                    eeg_msg.meanAlphaTpTen = atp10[i]
                    eeg_msg.meanBetaTpTen = betp10[i]
                    eeg_msg.meanThetaTpTen = ttp10[i]
                    eeg_msg.meanDeltaTpTen = dtp10[i]

                    eeg_msg.meanAlphaAfSeven = aaf7[i]
                    eeg_msg.meanBetaAfSeven = beaf7[i]
                    eeg_msg.meanThetaAfSeven = taf7[i]
                    eeg_msg.meanDeltaAfSeven = daf7[i]

                    eeg_msg.meanAlphaAfEight = aaf8[i]
                    eeg_msg.meanBetaAfEight = beaf8[i]
                    eeg_msg.meanThetaAfEight = taf8[i]
                    eeg_msg.meanDeltaAfEight = daf8[i]

                    st = eeg_msg.SerializeToString()
                    self.sock.send(st)
                    print("Sent message!")

    def main(self):
        t = threading.Thread(target=self.start)
        t.start()
        time.sleep(5)
        t.do_run = False
        t.join()

    def stop(self):
        print("Stopping any threads necessary...")


class AbstractDataChunk(ABC):
    @abstractmethod
    def __init__(self, data, *kwargs):
        raise Exception("Dont implement an abstract method")


class EEGDataChunk(AbstractDataChunk):
    def __init__(self, nchan, maxchunklen=12, data=None):
        self.n_channels = nchan
        self.maxchunklen = maxchunklen
        self.data = data


if __name__ == "__main__":
    print("Starting")
    boiledEggHandler = EEGHandler(
        port=1331, fromFile=True, filePath="/home/salieri/Projects/amadeOS/eeg-3d-vis/data/EEG_recording_2020-04-16-06.48.31.csv")
    boiledEggHandler.start()
