create table if not exists phone(
    id int primary key auto_increment,
    name varchar(127),

    data text,

    color varchar(255),
    display text,
    ram varchar(255),
    rom varchar(255),
    chip text,
    operation_system text,
    camera text,
    camera_selfle text,
    battery int,
    weight int,
    img text,
    hz text,
);