// QUES 如何 Module.export 异步获取的值

function getData() {
  return new Promise((resolve) => {
    const fs = require("fs");

    let dirs = fs.readdirSync("../BlogNote");
    dirs = dirs.filter((ele) => !ele.startsWith("."));

    const headNav = [];
    const sideBar = {};

    // [A, B, C]
    dirs.forEach((dirName) => {
      fs.stat(`../${dirName}`, (err, stats) => {
        if (err) {
          console.error(["dirs"], err);
          return;
        }

        // 是目录
        if (stats.isDirectory()) {
          // 加到顶部主分栏  headNav
          const headNavPath = `/${dirName}/`;
          headNav.push({ text: dirName, link: headNavPath });

          const headNacSideBarArray = [];
          let secDirs = fs.readdirSync(`../${dirName}`);
          // console.info("secDirs", secDirs);

          // [C , Java ]
          secDirs.forEach((secDirName) => {
            fs.stat(`../${dirName}/${secDirName}`, (secErr, secStat) => {
              if (secErr) {
                console.error(["secDirs"], err);
                return;
              }
              if (secStat.isDirectory()) {
                let thirdDirs = fs.readdirSync(`../${dirName}/${secDirName}`);
                // console.info("thirdDirs", thirdDirs);
                const children = thirdDirs.map((mdFileName) => [`/${dirName}/${secDirName}/${mdFileName}`, mdFileName]);
                // thirdDirs.forEach((mdFileName) => {
                //   children.push([`../${dirName}/${secDirName}/${mdFileName}`, mdFileName]);
                // });
                headNacSideBarArray.push({
                  title: secDirName, // 必要的
                  path: `/${dirName}/${secDirName}/`, // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                  collapsable: true, // 可选的, 默认值是 true,
                  sidebarDepth: 1, // 可选的, 默认值是 1
                  children,
                });
                sideBar[headNavPath] = headNacSideBarArray; // 构造下面的结构

                // console.info("headNacSideBarArray", headNacSideBarArray);
              }
            });
          });

          // "/person/": [
          //   {
          //     title: "program", // 必要的
          //     path: "/person/program/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          //     collapsable: true, // 可选的, 默认值是 true,
          //     sidebarDepth: 1, // 可选的, 默认值是 1
          //     children: [
          //       ["/person/program/p1.md", "program-p1"],
          //       ["/person/program/p2.md", "program-p2"],
          //     ],
          //   },
          //   {
          //     title: "teacher",
          //     children: [
          //       ["/person/program/p1.md", "program-p1"],
          //       ["/person/program/p2.md", "program-p2"],
          //     ],
          //     initialOpenGroupIndex: -1, // 可选的, 默认值是 0
          //   },
          // ],
        }
        // console.info("xxx-headNav", headNav);
        // console.info("xxx-sideBar", sideBar);
      });
    });

    setTimeout(() => {
      resolve([headNav, sideBar]);
      // console.info("headNav", JSON.stringify(headNav));
      // console.info("sideBar", JSON.stringify(sideBar));
    }, 3000);
  });
}

const data = getData();
console.info("data", data);
