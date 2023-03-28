document.addEventListener("DOMContentLoaded", function() {
  // 从chrome.storage.sync中获取已保存的XSS语句
  chrome.storage.sync.get("xssList", function(data) {
    let xssList = data.xssList || [
      '<script>alert("XSS")</script>',
      '<img src="x" onerror="alert(\'XSS\');" />'
      // 添加更多常见的XSS语句
    ];

    let xssSelect = document.getElementById("xssList");

    // 将XSS语句添加到下拉菜单
    xssList.forEach((xss) => {
      let option = document.createElement("option");
      option.text = xss;
      option.value = xss;
      xssSelect.add(option);
    });

    // 添加新的XSS语句
    document.getElementById("addXss").addEventListener("click", function() {
      let newXss = document.getElementById("newXss").value;
      if (newXss) {
        let option = document.createElement("option");
        option.text = newXss;
        option.value = newXss;
        xssSelect.add(option);
        document.getElementById("newXss").value = ""; // 清空输入框

        // 将新的XSS语句添加到列表并保存到chrome.storage.sync中
        xssList.push(newXss);
        chrome.storage.sync.set({ xssList: xssList }, function() {
          console.log("新的XSS语句已保存");
        });
      }
    });
  });

  // 复制XSS语句到剪贴板
  document.getElementById("xssList").addEventListener("change", function() {
    let xssSelect = document.getElementById("xssList");
    let selectedXss = xssSelect.options[xssSelect.selectedIndex].value;
    if (selectedXss) {
      navigator.clipboard.writeText(selectedXss).then(function() {
        // 成功复制到剪贴板
        console.log("XSS语句已复制到剪贴板");
      }, function() {
        // 复制到剪贴板失败
        console.error("无法复制XSS语句到剪贴板");
      });
    }
  });
});
