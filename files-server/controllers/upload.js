const formidable = require("formidable");
const mv = require("mv");

const FILE_SERVER_URL =
  process.env.NODE_ENV === "development" ? process.env.FILE_SERVER_URL_DEV : process.env.FILE_SERVER_URL_PROD;

const upload = async (req, res) => {
  console.log("running");
  let success = false;
  try {
    let formData = new formidable.IncomingForm();
    formData.parse(req, async function (error, fields, files) {
      if (Object.keys(files).length === 0) {
        return res.status(422).json({ success, error: "No files received!" });
      }

      for (const key of Object.keys(files)) {
        const val = files[key];
        const file = val[0];
        const extension = file.originalFilename.substring(
          file.originalFilename.lastIndexOf(".")
        );

        const path = file.newFilename + extension;
        const newPath = "uploads/" + path;
        const filename = `${FILE_SERVER_URL}/${file.newFilename + extension}`;

        // fs.rename(file.filepath, newPath, async function (errorRename) {
        //   if (errorRename) {
        //     console.log("err: ", errorRename);
        //     return res.status(400).json({ error: "Something went wrong!" });
        //   }
        //   success = true;
        //   return res.status(200).json({ success, filename });
        // });

        mv(file.filepath, newPath, (err) => {
          if (err) {
            return;
          }
        });
        success = true;
        return res.status(200).json({ success, filename });
      }

      //   const extension = fields.data.originalFilename.substr(
      //     fields.data.originalFilename.lastIndexOf(".")
      //   );

      //   const path = fields.data.newFilename + extension;
      //   const newPath = "uploads/" + path;

      //   fs.rename(fields.data.filepath, newPath, async function (errorRename) {
      //     // if (errorRename) {
      //     //   return res.status(400).json({ error: "Something went wrong!" });
      //     // }
      //     success = true;
      //     return res.status(200).json({ success, filename: path });
      //     });
      //   success = true;
      //   return res.status(200).json({ success, filename: null });
    });
  } catch (error) {
    success = false;
    return res.status(500).json({ success, error: error.message });
  }
};

module.exports = upload;
