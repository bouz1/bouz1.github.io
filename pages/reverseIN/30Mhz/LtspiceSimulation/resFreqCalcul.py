import numpy as np

# https://circuitdigest.com/tutorial/quartz-crystal-oscillator
# SERIE 
L1=3e-3
C1= 0.01e-12
R1= 6.8
# PARALLELE 
C2= 30e-12

# Series resonant frequency of the crystal is –
fs= 1/(2*np.pi*np.sqrt(L1*C1))
# Crystal’s parallel resonant frequency, fp is –
Ceq=(C2*C1)/(C2+C1)
fp= 1/(2*np.pi*np.sqrt(L1*Ceq))


fsM=round(fs/1e6,3)
fpM=round(fp/1e6,3)

# Q factor 
Q=round(2*np.pi*fs*L1/R1)

print ("fs",fsM,"fp",fpM,"Q",Q)
a=input ("")
