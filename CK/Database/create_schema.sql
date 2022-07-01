create table if not exists phones(
    id int,
    name varchar(255),
    display_size text,
    display_tech text,
    camera text,
    camera_selfie text,
    ram int,
    rom int,
    battery varchar(255),
    sim text,
    operating_system text,
    resolution text,
    display_feature text,
    cpu_type text,
    weight text,
    monitor_frequency int,
    cpu text,
    bluetooth text,
    image text
);

create table if not exists sources(
    phone_id int,
    source varchar(255),
    price int,
    url text
);

insert into phone (
    name,
    data,
    display_size,
    display_tech,
    camera,
    camera_selfie,
    ram,
    rom,
    battery,
    sim,
    operating_system,
    resolution,
    display_feature,
    cpu_type,
    weight,
    monitor_frequency,
    cpu,
    bluetooth,
    image)
value (
    "iPhone 11 128GB I Chính hãng VN/A ",
    "6.1",
    "IPS LCD",
    "Camera kép 12MP:- Camera góc rộng: ƒ/1.8 aperture- Camera siêu rộng: ƒ/2.4 aperture",
    "12 MP  ƒ/2.2 aperture",
    "4",
    "128",
    "3110",
    "Nano-SIM + eSIM",
    "iOS 13 hoặc cao hơn (Tùy vào phiên bản phát hành)",
    "1792 x 828 pixel",
    "True-tone",
    "Hexa-core",
    "194",
    "60",
    "A13 Bionic",
    "5.0",
    "https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/04/18/image-removebg-preview-5.png"
);