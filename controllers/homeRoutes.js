const router = require("express").Router();
const { User, Workspace } = require('../models')
// Initial homepage signup and login
router.get("/", async (req, res) => {
  res.render("welcome");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});
router.get("/invite", async (req, res) => {
  try {
    // get the workspace id the logged in user is associated with
    const user = await User.findByPk(req.session.user_id)
    // get the workspace
    const workspaceData = await Workspace.findOne({
      where: {
        id: user.workspace_id
      }
    })
    const workspace = workspaceData.get({plain: true})
    console.log(workspace);
    res.render("invite", { workspace });
  } catch (err) {
    res.status(500).json(err.message)
  }

});

// router.get("/workspace", async (req, res) => {
//   res.render("newWorkspace");
// });

// router.get("/create", async (req, res) => {
//   res.render("newWorkspace");
// });

// router.get("/join", async (req, res) => {
//   res.render("newWorkspace");
// });

// Workspace home /home

module.exports = router;
