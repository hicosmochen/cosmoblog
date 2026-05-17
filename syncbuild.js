#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs-extra");

// fs.copySync(`${__dirname}/docs/BlogNote/README.md`, `${__dirname}/docs/README.md`, { overwrite: true });

// try {
//   console.info("code sync ...");
//   execSync("git pull", { cwd: `${__dirname}/docs/BlogNote` });
//   console.info("[success-pull] - git pull");

//   console.info("build ...");
//   execSync("yarn build", { cwd: `${__dirname}` });
//   console.info("[success-build] - tarn build", new Date());
// } catch (error) {
//   console.info("[error] - sync & build", error);
// }

/** ----------------------------------- 05-24 ----------------------------------------- */
function reDeployCosmoSite(CB) {
  fs.copySync(`${__dirname}/docs/BlogNote/README.md`, `${__dirname}/docs/README.md`, { overwrite: true });

  try {
    console.info("code sync ...");
    execSync("git pull", { cwd: `${__dirname}/docs/BlogNote` });
    console.info("[success-pull] - git pull");

    const recentCommitMsg = execSync(`git log -1 --pretty=format:"%s" `, {
      cwd: `${__dirname}/docs/BlogNote`,
    }).toString();

    console.info("build ...");
    execSync("yarn build", { cwd: `${__dirname}` });
    console.info("[success-build] - tarn build", new Date());

    CB(recentCommitMsg, `🎆 Success at ${new Date().toLocaleString()}`);
  } catch (error) {
    console.info("[error sync & build]", error);

    CB("[can't get commit]", "[error] - sync & build" + error?.toString());
  }
}

module.exports = {
  reDeployCosmoSite,
};
