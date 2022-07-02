const knex = require("./db");
async function getProductList(req, res) {
  try {
    let page = Number(req.body.page) || 1;
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
    let productList = await knex("phones")
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
          if (req.body.hasImage) {
            query.whereNot("image", null);
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
    let product = await knex("phones").where("id", id).first();

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
      knex("phones").groupBy("ram").orderBy("ram", "desc").select("ram"),
      knex("phones").groupBy("rom").orderBy("rom", "desc").select("rom"),
      knex("phones")
        .groupBy("battery")
        .orderBy("battery", "desc")
        .select("battery"),
      knex("phones")
        .groupBy("display_size")
        .orderBy("display_size", "desc")
        .select("display_size"),
      knex("phones")
        .groupBy("display_tech")
        .orderBy("display_tech", "desc")
        .select("display_tech"),
      knex("phones")
        .groupBy("camera")
        .orderBy("camera", "desc")
        .select("camera"),
      knex("phones")
        .groupBy("camera_selfie")
        .orderBy("camera_selfie", "desc")
        .select("camera_selfie"),
      knex("phones")
        .groupBy("operating_system")
        .orderBy("operating_system", "desc")
        .select("operating_system"),
      knex("phones")
        .groupBy("resolution")
        .orderBy("resolution", "desc")
        .select("resolution"),
      knex("phones")
        .groupBy("cpu_type")
        .orderBy("cpu_type", "desc")
        .select("cpu_type"),
    ]);
    return res.status(200).json({
      success: true,
      result: {
        ram: ram.map((i) => i.ram).filter((i) => i !== null && i <= 16).sort((a,b) => a > b),
        rom: rom.map((i) => i.rom).filter((i) => i !== null && i <= 512).sort((a,b) => a > b),
        battery: battery.map((i) => i.battery).filter((i) => i !== null && i <= 10000 && i >= 500).sort((a,b) => Number(a) > Number(b)),
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

async function getCompare(req, res) {
  try {
    const id = parseInt(req.params.id);
    let product = await knex("sources").where("phone_id", id);

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


module.exports = {
  getProductList: getProductList,
  getProduct: getProduct,
  getFilter: getFilter,
  getCompare: getCompare
};
