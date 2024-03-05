const router = require("express").Router();
const { Workspace, User } = require("../../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'vernie60@ethereal.email',
    pass: 'c6DtrjyrhnsCyUHbNx'
  },
});


// send the workplace into the database with the 'creating a workspace? button'
router.post("/", async (req, res) => {
  try {
    const workspaceData = await Workspace.create(req.body);
    res.status(201).json(workspaceData);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// user will pass a join code and the workspace will be retreived
router.get("/:code", async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      where: {
        join_code: req.params.code,
      },
    });
    if (!workspace) {
      return res.status(404).json("Workspace not found");
    }
    res.json(workspace);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// will add the logged in user to the workspace with the passed id
router.put('/add-user/:id', async (req, res) => {
  try {
   await User.update({ workspace_id: req.params.id },
      {
        where: {
          id: req.session.user_id
        }
      })
    res.status(204).end()
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// mail out the invites using nodemailer/ethereal
router.post('/invites', async (req, res)=> {
  const {values, join_code} = req.body
 console.log(values);

  const info = await transporter.sendMail({
    from: '"Elevate" <elevate@ethereal.email>', // sender address
    to: values, // list of receivers
    subject: "You've been invited! ✔", // Subject line
    text: `You've been invited to a workspace. Your join code is ${join_code}`, // plain text body
    html: `<b>You've been invited to a workspace. Your join code is '${join_code}'</b>`, // html body
  });

 
  res.json(info)
})

module.exports = router;
