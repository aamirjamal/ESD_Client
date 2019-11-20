Project.DetailTabs = (function() {
  const url = "https://people.rit.edu/dmgics/754/23/proxy.php";
  function getTabs(id) {
    $.ajax({
      id: id,
      url: url,
      data: { path: "/Application/Tabs?orgId=" + id },
      dataType: "xml",
      success: function(data) {
        console.log(data);
        $("#details").html("");
        $("#details").html("<div id='tabs'></div>");
        var lis = "<ul>";
        var divs = "";
        if ($(data).find("error").length !== 0) {
          $("#tabs").html("<h2>Something wrong in ajax call.</h2>");
        } else if ($(data).find("row").length == 0) {
          $("#tabs").html("<h2>No data found.</h2>");
        } else {
          $("row", data).each(function() {
            tabname = $("Tab", this).text();
            lis +=
              "<li><a id='a" +
              tabname +
              "' href='#" +
              tabname +
              "'>" +
              tabname +
              "</a></li>";
            divs +=
              "<div id='" +
              tabname +
              "'>Loading " +
              tabname +
              " content...</div>";
          });
          $("#tabs").html(lis + "</ul>" + divs);
        }
        $("#tabs").tabs();
        $("#details").modal();
        $("li").on("click", e => {
          Project.DetailTabs.getTabData(e.target.id.substring(1));
        });
        console.log(this);
        console.log(this.detailtab);
        // getGeneralInfo(id);
        fetchTabData(id, "General");
      }
    });
  }

  function getGeneralInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/General" },
      dataType: "xml",
      success: function(data) {
        Project.GeneralTab.buildTabContent(data);
      }
    });
  }

  function getPhysiciansInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/Physicians" },
      dataType: "xml",
      success: function(data) {
        Project.PhysiciansTab.buildTabContent(data);
      }
    });
  }

  function getAssetsInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/Facilities" },
      dataType: "xml",
      success: function(data) {
        Project.FacilitiesTab.buildTabContent(data);
      }
    });
  }

  function getTreatmentsInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/Treatments" },
      dataType: "xml",
      success: function(data) {
        Project.TreatmentTab.buildTabContent(data);
      }
    });
  }

  function getLocationInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/Locations" },
      dataType: "xml",
      success: function(data) {
        Project.LocationTab.buildTabContent(data);
      }
    });
  }

  function getTrainingInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/Training" },
      dataType: "xml",
      success: function(data) {
        Project.TrainingTab.buildTabContent(data);
      }
    });
  }

  function getEquipmentInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/Equipment" },
      dataType: "xml",
      success: function(data) {
        console.log(data);
      }
    });
  }

  function getPeopleInfo(id) {
    $.ajax({
      url: url,
      data: { path: "/" + id + "/People" },
      dataType: "xml",
      success: function(data) {
        Project.PeopleTab.buildTabContent(data);
      }
    });
  }

  function fetchTabData(id, tabName) {
    console.log(tabName);
    tabName = tabName === "Treatment" ? "Treatments" : tabName;
    console.log(tabName);
    $.ajax({
      url: url,
      data: { path: "/" + id + "/" + tabName },
      dataType: "xml",
      success: function(data) {
        console.log("YO", this.url);
        switch (tabName) {
          case "General":
            Project.GeneralTab.buildTabContent(data);
            break;
          case "Facilities":
            Project.FacilitiesTab.buildTabContent(data);
            break;
          case "People":
            Project.PeopleTab.buildTabContent(data);
            break;
          case "Locations":
            Project.LocationTab.buildTabContent(data);
            break;
          case "Treatment":
            Project.TreatmentTab.buildTabContent(data);
            break;
          case "Training":
            Project.TrainingTab.buildTabContent(data);
            break;
          case "Physicians":
            Project.PhysiciansTab.buildTabContent(data);
            break;
          case "Equipment":
            console.log(data);
            break;
        }
      }
    });
  }

  return {
    orgId: undefined,
    getTabs: function(id) {
      this.orgId = id;
      getTabs(id);
    },
    getTabData: function(tabName) {
      // fetchTabData(this.orgId, tabName);
      if (tabName === "General") getGeneralInfo(this.orgId);
      else if (tabName === "Facilities") getAssetsInfo(this.orgId);
      else if (tabName === "People") getPeopleInfo(this.orgId);
      else if (tabName === "Locations") getLocationInfo(this.orgId);
      else if (tabName === "Treatment") getTreatmentsInfo(this.orgId);
      else if (tabName === "Training") getTrainingInfo(this.orgId);
      else if (tabName === "Physicians") getPhysiciansInfo(this.orgId);
      else if (tabName === "Equipment") getEquipmentInfo(this.orgId);
    }
  };
})();
