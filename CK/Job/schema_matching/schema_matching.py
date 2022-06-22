import valentine
from valentine import valentine_match, valentine_metrics, NotAValentineMatcher
from valentine.algorithms import Coma, Cupid
import pandas as pd
import os
import json
import nltk
nltk.download('omw-1.4')

path = "../../res"
d1_path = os.path.join(path, "cellphoneS_nom.csv")
d2_path = os.path.join(path, "tgdd_nom.csv")

df1 = pd.read_csv(d1_path, sep = ";")
df2 = pd.read_csv(d2_path, sep = ";")


# matcher = Coma(strategy="COMA_OPT")
matcher = Cupid()

matches = valentine_match(df1, df2, matcher)

for key in matches:
    print(f'{key}:  {matches[key]}:')

# with open("schema_match", "w") as f:

#     for row in matches:
#         f.writelines(row[0])

