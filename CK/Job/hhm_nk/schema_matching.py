import valentine
from valentine import valentine_match, valentine_metrics, NotAValentineMatcher
from valentine.algorithms import Coma, Cupid, DistributionBased, JaccardLevenMatcher, SimilarityFlooding
import pandas as pd
import os
import json
import nltk
from valentine.data_sources import DataframeTable
# nltk.download('omw-1.4')

path = "../../res"
d1_path = os.path.join(path, "cellphones.csv")
d2_path = os.path.join(path, "hhm.csv")

df1 = pd.read_csv(d1_path, sep = ";",on_bad_lines='skip')
df2 = pd.read_csv(d2_path, sep = ";" , on_bad_lines='skip')

d1 = DataframeTable(df1, "cellphones")
d2 = DataframeTable(df2, "hhm")

print(d1)
print(d2)

matcher = Coma(strategy="COMA_OPT_INST")
# matcher = Coma(strategy="COMA_OPT")
# matcher = Cupid()




# matcher = DistributionBased()
# matcher = JaccardLevenMatcher()
# matcher = SimilarityFlooding()

matches = matcher.get_matches(d1, d2)

for key in matches:
    print(f'{key}:  {matches[key]}:')

# with open("schema_match", "w") as f:

#     for row in matches:
#         f.writelines(row[0])

