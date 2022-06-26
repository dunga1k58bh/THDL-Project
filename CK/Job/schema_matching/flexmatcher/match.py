import pandas as pd
import os
import flexmatcher


path = "../../../res"
train_path = os.path.join(path, "nom/cellphones.csv")

train_df = pd.read_csv(train_path, sep = ";")
train_header = ['name', 'price', 'url', 'source', 'display_size', 'display_tech',
       'camera', 'front_camera', 'ram', 'rom', 'batery', 'sim', 'os',
       'resolution', 'display_feature', 'cpu_type', 'weight', 'hz', 'chip_set',
       'blue_tooth']

train_df = train_df.astype(str)

train_mapping = {'name': 'name', 'price': 'data.price', 'url': 'data.url', 'source': 'data.source',
                 'display_size': 'display_size', 'display_tech': 'display_tech', 'camera': 'camera',
                 'front_camera': 'camera_selfie', 'ram': 'ram', 'rom': 'rom', 'batery': 'batery', 'sim': 'sim',
                 'os': 'operating_system', 'resolution': 'resolution', 'display_feature': 'display_feature', 'cpu_type': 'cpu_type', 'weight': 'weight', 'hz': 'monitor_frequence', 'chip_set': 'cpu',
                 'blue_tooth': 'bluetooth'}

schema_list = [train_df]
mapping_list = [train_mapping]


# Using Flexmatcher
fm = flexmatcher.FlexMatcher(schema_list, mapping_list, sample_size=100)
fm.train()            # train flexmatcher

print(fm.meta_model)

#Predict maping schema

predict_path = os.path.join(path, "hhm.csv")
predict_df = pd.read_csv(predict_path, sep=';')
print(predict_df)
predict_df = predict_df.astype(str)

predicted_mapping = fm.make_prediction(predict_df)

print("Source     ==>    Target Schema")
for pair in predicted_mapping:
    print(f'{pair}      ===>       {predicted_mapping[pair]}')