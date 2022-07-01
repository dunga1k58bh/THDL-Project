const knex = require("./db");
async function getProductList(req, res) {
  try {
    let page = req.body.page || 1;
    let perpage = req.body.perpage || 8;
    // let query = knex("phone");
    // if (req.body.ram?.length) {
    //   query = query.whereIn("ram", req.body.ram);
    // }
    // if (req.body.rom?.length) {
    //   query = query.whereIn("rom", req.body.rom);
    // }
    // if (req.body.battery?.length) {
    //   query = query.whereIn("battery", req.body.battery);
    // }
    // if (req.body.display_size?.length) {
    //   query = query.whereIn("display_size", req.body.display_size);
    // }
    let productList = await knex("phone")
      .modify(function (query) {
        if (req.body.ram?.length) {
            query.whereIn("ram", req.body.ram);
          }
          if (req.body.rom?.length) {
            query.whereIn("rom", req.body.rom);
          }
          if (req.body.battery?.length) {
            query.whereIn("battery", req.body.battery);
          }
          if (req.body.display_size?.length) {
            query.whereIn("display_size", req.body.display_size);
          }
      })
      .whereLike("name", `%${req.body.searchValue || ""}%`)
      .paginate({ perPage: perpage, currentPage: page, isLengthAware: true });

    return res.status(200).json({
      success: true,
      result: productList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}

async function getProduct(req, res) {
  try {
    const id = parseInt(req.params.id);
    let product = await knex("phone").where("id", id).first();

    return res.status(200).json({
      success: true,
      result: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}

async function getFilter(req, res) {
  try {
    let [
      ram,
      rom,
      battery,
      display_size,
      display_tech,
      camera,
      camera_selfie,
      operating_system,
      resolution,
      cpu_type,
    ] = await Promise.all([
      knex("phone").groupBy("ram").orderBy("ram", "desc").select("ram"),
      knex("phone").groupBy("rom").orderBy("rom", "desc").select("rom"),
      knex("phone")
        .groupBy("battery")
        .orderBy("battery", "desc")
        .select("battery"),
      knex("phone")
        .groupBy("display_size")
        .orderBy("display_size", "desc")
        .select("display_size"),
      knex("phone")
        .groupBy("display_tech")
        .orderBy("display_tech", "desc")
        .select("display_tech"),
      knex("phone")
        .groupBy("camera")
        .orderBy("camera", "desc")
        .select("camera"),
      knex("phone")
        .groupBy("camera_selfie")
        .orderBy("camera_selfie", "desc")
        .select("camera_selfie"),
      knex("phone")
        .groupBy("operating_system")
        .orderBy("operating_system", "desc")
        .select("operating_system"),
      knex("phone")
        .groupBy("resolution")
        .orderBy("resolution", "desc")
        .select("resolution"),
      knex("phone")
        .groupBy("cpu_type")
        .orderBy("cpu_type", "desc")
        .select("cpu_type"),
    ]);
    return res.status(200).json({
      success: true,
      result: {
        ram: ram.map((i) => i.ram),
        rom: rom.map((i) => i.rom),
        battery: battery.map((i) => i.battery),
        display_size: display_size.map((i) => i.display_size),
        display_tech: display_tech.map((i) => i.display_tech),
        camera: camera.map((i) => i.camera),
        camera_selfie: camera_selfie.map((i) => i.camera_selfie),
        operating_system: operating_system.map((i) => i.operating_system),
        resolution: resolution.map((i) => i.resolution),
        cpu_type: cpu_type.map((i) => i.cpu_type),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}

module.exports = {
  getProductList: getProductList,
  getProduct: getProduct,
  getFilter: getFilter,
};
