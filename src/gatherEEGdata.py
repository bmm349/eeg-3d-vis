import time
import numpy as np
import pandas as pd
import pylsl
import threading
import zmq
import eeg_payload_pb2 as Message
from abc import ABC,abstractmethod
import threading
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
    def __init__(self, sensor_type='eeg', port=1331):
        print("Starting EEG Data Handler...")
        ctx = zmq.Context()
        self.sock = ctx.socket(zmq.PUB)
        self.sock.setsockopt(zmq.SNDTIMEO, 1000)
        self.sock.setsockopt(zmq.LINGER, 1000)
        self.sock.setsockopt(zmq.IMMEDIATE, 1)
        self.sock.bind(f"tcp://127.0.0.1:{port}")
        self.current_lsl_streams = pylsl.resolve_byprop('type', 'EEG', timeout=5)
        if self.type == 'eeg':
            # Set our data type to our chunk
            self.dtype = EEGDataChunk(4, 12, None)
        else:
            print("other types are not implemented...")
    def start(self, from_file=False):
        self.inlet = pylsl.StreamInlet(self.current_lsl_streams[0], max_chunklen=getattr(self.dtype, 'maxchunklen')
        assert getattr(self.dtype, 'n_channels') == self.inlet.info().channel_count()
        print("Starting any threads necessary...")
        if (from_file):
            # do file reading and looping here.
        else:
            # start muselsl piepline here.
            t = threading.currentThread()
            while getattr(t, 'do_run', True):
                data, ts = self.inlet

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
if __name__=="__main__":
    print("Starting")
    boiledEggHandler = EEGHandler(port=1331)
