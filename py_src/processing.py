import numpy as np

def next_power_of_2(x):
    return 1 if x == 0 else 2**(x - 1).bit_length()

def calculate_power_bands(channel):
    windowLen, nchan = channel.shape[0], 1
    w = np.hamming(windowLen)
    windowedCenterHammingChannel = (
        (channel - np.mean(channel, axis=0)).T * w).T
    nfft = next_power_of_2(windowLen)
    Y = np.fft.fft(windowedCenterHammingChannel, n=nfft, axis=0)/windowLen
    psd = 2 * np.abs(Y[0:int(nfft/2)])
    f = 256 / 2 * np.linspace(0, 1, int(nfft/2))
    index_delta, = np.where(f < 4)
    index_theta = np.where((f >= 4) & (f <= 8))
    index_alpha = np.where((f >= 8) & (f <= 12))
    index_Beta = np.where((f >= 12) & (f <= 30))
    return psd[index_delta], psd[index_theta], psd[index_alpha], psd[index_Beta]

