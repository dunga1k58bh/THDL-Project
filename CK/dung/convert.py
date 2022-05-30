from asyncio import DatagramTransport
import pandas as pd

# data = pd.read_excel("product 11.xlsx")

# data.to_csv("tiki.csv", sep="&")

data = pd.read_csv("tiki.csv", sep="&")

print(data[data.columns[2]])
