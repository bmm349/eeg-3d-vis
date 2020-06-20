import time
import numpy as np
import pandas as pd
import pylsl
import threading
import zmq
import eeg_payload_pb2 as Message
from abc import ABC,abstractmethod

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
    def start(self):
        print("Starting any threads necessary...")
    def stop(self):
        print("Stopping any threads necessary...")
if __name__=="__main__":
    print("Starting")
    boiledEggHandler = EEGHandler(port=1331)
