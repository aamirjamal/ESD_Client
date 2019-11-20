var Project = (function() {
  $("#resetBtn").click(clearAll);
  $("#resultBtn").click(showResult);

  $("#state").on("change", function(e) {
    fetchCounties(this.value);
  });
  $("#county").on("change", function(e) {
    fetchCities(this.value);
  });

  var url = "http://people.rit.edu/dmgics/754/23/proxy.php";

  function fetchCounties(state) {
    $.ajax({
      type: "GET",
      cache: false,
      url: url,
      data: { path: "/Counties?state=" + state },
      dataType: "xml",
      success: function(data, status) {
        $("#county")
          .empty()
          .append('<option value="">County</option>');
        if ($(data).find("error").length !== 0) {
          console.log("Error in fetching OrgTypes");
        } else if ($(data).find("row").length == 0) {
          console.log("No County found");
        } else {
          $("row", data).each(function() {
            $("#county").append(
              '<option value="' +
                $("CountyName", this).text() +
                '">' +
                $("CountyName", this).text() +
                "</option>"
            );
          });
        }
      }
    });
  }

  function fetchCities(county) {
    $.ajax({
      type: "GET",
      cache: false,
      url: url,
      data: { path: "/Cities?county=" + county },
      dataType: "xml",
      success: function(data, status) {
        $("#city")
          .empty()
          .append('<option value="">City</option>');
        if ($(data).find("error").length !== 0) {
          console.log("Error in fetching OrgTypes");
        } else if ($(data).find("row").length == 0) {
          console.log("No City found");
        } else {
          $("row", data).each(function() {
            $("#city").append(
              '<option value="' +
                $("city", this).text() +
                '">' +
                $("city", this).text() +
                "</option>"
            );
          });
        }
      }
    });
  }

  function showResult() {
    $.ajax({
      type: "GET",
      async: true,
      cache: false,
      url: url,
      data: {
        path:
          "/Organizations?type=" +
          escape($("#orgType").val()) +
          "&name=" +
          escape($("#orgName").val()) +
          "&town=" +
          escape($("#city").val()) +
          "&state=" +
          escape($("#state").val()) +
          "&zip=" +
          escape($("#zip").val()) +
          "&county=" +
          escape($("#county").val())
      },
      dataType: "xml",
      success: function(data, status) {
        buildResultTable(data);
      }
    });
  }

  function buildResultTable(data) {
    var resultDiv = $("#result");
    if ($(data).find("error").length !== 0) {
      console.log("Error");
      var p = $("<p />");
      p[0].append("Error in fetch.");
      resultDiv[0].append(p[0]);
    } else if ($(data).find("row").length == 0) {
      console.log("No result found");
      var p = $("<p />");
      p[0].append("No Data Found.");
      resultDiv[0].append(p[0]);
    } else {
      var table = $("<table />");
      table[0].border = "1";
      var row = $(table[0].insertRow(-1));
      for (var header of ["Type", "Name", "City", "Zip", "County", "State"]) {
        var headerCell = $("<th />");
        headerCell.html(header);
        row.append(headerCell);
      }

      $("row", data).each(function() {
        row = $(table[0].insertRow(-1));

        // row.append($("<td />").html($("type", this).text()));
        // row.append($("<td />").html($("Name", this).text()));
        // row.append($("<td />").html($("city", this).text()));
        // row.append($("<td />").html($("zip", this).text()));
        // row.append($("<td />").html($("CountyName", this).text()));
        // row.append($("<td />").html($("State", this).text()));
        row = $(table[0].insertRow(-1));
        var type = $("<td />");
        type.html($("type", this).text());
        row.append(type);
        var name = $("<td />");
        // name.html($("Name", this).text());
        var a = $("<a/>", {
          id: $("OrganizationID", this).text(),
          // href: "#details",
          // rel: "modal:open",
          class: "orgName",
          onclick: "Project.DetailTabs.getTabs(this.id)"
          // onclick: "FormManager.openDetails(this.id)"
        });
        a.append($("Name", this).text());
        name.append(a);
        row.append(name);
        var city = $("<td />");
        city.html($("city", this).text());
        row.append(city);
        var zip = $("<td />");
        zip.html($("zip", this).text());
        row.append(zip);
        var county = $("<td />");
        county.html($("CountyName", this).text());
        row.append(county);
        var state = $("<td />");
        state.html($("State", this).text());
        row.append(state);
      });
      resultDiv.html("");
      resultDiv.append(table);
    }
  }

  function clearAll() {
    $(":input", "#form")
      .not(":button, :submit, :reset, :hidden")
      .val("")
      .prop("checked", false)
      .prop("selected", false);
    $("#result").empty();

    $("#details").modal();
  }

  function fillOrgTypes(data) {
    if ($(data).find("error").length !== 0) {
      console.log("Error in fetching OrgTypes");
    } else if ($(data).find("row").length == 0) {
      console.log("No OrgType found");
    } else {
      $("row", data).each(function() {
        $("#orgType").append(
          '<option value="' +
            $("type", this).text() +
            '">' +
            $("type", this).text() +
            "</option>"
        );
      });
    }
  }

  function fillStates(data) {
    if ($(data).find("error").length !== 0) {
      console.log("Error in fetching OrgTypes");
    } else if ($(data).find("row").length == 0) {
      console.log("No OrgType found");
    } else {
      $("row", data).each(function() {
        $("#state").append(
          '<option value="' +
            $("State", this).text() +
            '">' +
            $("State", this).text() +
            "</option>"
        );
      });
    }
  }

  $(
    $.ajax({
      type: "GET",
      cache: false,
      url: url,
      data: { path: "/OrgTypes" },
      dataType: "xml",
      success: function(data, status) {
        fillOrgTypes(data);
      }
    }),

    $.ajax({
      type: "GET",
      cache: false,
      url: url,
      data: { path: "/States" },
      dataType: "xml",
      success: function(data, status) {
        fillStates(data);
      }
    })
  );

  return {
    clearAll: clearAll,
    openDetails: function(id) {
      console.log(id);
    }
  };
})();
