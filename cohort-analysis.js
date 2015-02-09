!(function (d3) {

      // console.log(cohort_type);
      var Greens= ["#E6F2E6","#CCE6CC","#80C080","#4DA64D","#198D19"]
          ReGn = ['#006837','#1a9850','#66bd63','#a6d96a','#d9ef8b','#ffffbf','#fee08b','#fdae61','#f46d43','#d73027','#E60000']
          Reds = ["#fcbba1","#fc9272","#fb6a4a","#ef3b2c"]
          Blues = ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]
          BloodRedsRev =['#8A0707','#962020','#A13939','#AD5151','#B96A6A','#C48383','#D09C9C','#DCB5B5','#E8CDCD','#F3E6E6','#FFFFFF']
          BloodReds=['#FFFFFF', '#F3E6E6', '#E8CDCD', '#DCB5B5', '#D09C9C', '#C48383', '#B96A6A', '#AD5151', '#A13939', '#962020', '#8A0707']
          BloodReds2 = ['#FFFFFF', '#F5E6E6', '#EACCCC', '#E0B2B3', '#D6999A', '#CC8080', '#C16667', '#B74D4E', '#AD3335', '#A2191B', '#980002']
          BloodReds3 = ['#FFFFFF', '#F6E8E8', '#ECD1D1', '#E3BABB', '#DAA3A4', '#D08C8D', '#C77576', '#B54749', '#AB3032', '#A2191B']
          BloodReds4 =['#FFFFFF', '#FAE2E5', '#F6C6CB', '#F2AAB1', '#EE8D97', '#E9717E', '#E55564', '#E1384A', '#DD1C30', '#D90017']
          Greens2 = ['#11CE09','#2BD324','#45D83F','#60DE5B','#7AE376','#95E991','#AFEEAD','#CAF4C8','#E4F9E3','#FFFFFF']

          RdGn = ['#A2191B', '#AB3032', '#B54749', '#C77576', '#D08C8D', '#66B366', '#4DA64D', '#339933', '#198D19', '#008000']
          BrOrYl = ["#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]
          ReYl = ['#fe9929','#fec44f','#fee391','#fff7bc','#ffffe5','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#a50f15']
          GnRe = ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#FF0000"]
          RdYlGn = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]
          Rd_Gn=['#A2191B', '#AB3032', '#B54749', '#C77576', '#D08C8D', '#DAA3A4', '#E3BABB', '#ECD1D1', '#F6E8E8', '#FFFFFF', '#E6F2E6', '#CCE6CC', '#99CC99', '#80C080', '#66B366', '#4DA64D', '#339933', '#198D19', '#008000']
          Rd_Gn2=['#D08C8D', '#DAA3A4', '#E3BABB', '#ECD1D1','#CCE6CC', '#99CC99', '#80C080', '#66B366', '#4DA64D']
          PiYG = ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]
          GnYl = ['#edf600', '#dbed00', '#c9e400', '#b7db00', '#a5d200', '#93c900', '#81c000', '#6fb700', '#5dae00', '#4ba500', '#399c00', '#279300', '#158a00', '#038100']
          YlRe = ['#d81515', '#db2727', '#de3939', '#e14b4b', '#e45d5d', '#e76f6f', '#ea8181', '#ed9393', '#f0a5a5', '#f3b7b7', '#f6c9c9', '#f9dbdb', '#fceded', '#ffffff']

          GnYlRe =['#d81515','#de3939', '#e45d5d','#ea8181','#f0a5a5', '#f6c9c9', '#fceded','#a5d200', '#93c900', '#81c000', '#6fb700','#4ba500', '#158a00']

          custom = ['#ef3b2c','#fc9272', '#fcbba1', '#fee0d2', '#fff5f0',"#E6F2E6","#CCE6CC","#80C080","#4DA64D","#198D19"]
          custom2 = ['#D53E4F', '#F46D43', '#FDAE61', '#FEE08B', '#f6faaa',"#E6F2E6","#CCE6CC","#80C080","#4DA64D","#198D19"]


      if (cohort_type == "Retention"){file_name = "retention-data.tsv" ;fill_content = "retentionContent";colors = custom;}
      else if (cohort_type == "Churn"){file_name = "churn-data.tsv" ;fill_content = "churnContent"; colors = Blues;}
      else if (cohort_type == "Uninstall"){file_name = "uninstall-data.tsv"; fill_content = "uninstallContent"; colors = BrOrYl;}


      $(fill_content).empty();
      
      var yAxisNames = ["Dec w1", "Dec w2", "Dec w3", "Dec w4", "Jan w1", "Jan w2", "Jan w3"],
        xAxisNames = [cohort_type,"W1", "W2", "W3", "W4", "W5", "W6", "W7"];

      var margin = { top: 70, right: 0, bottom: 100, left: 100 },
          width = 800 - margin.left - margin.right,
          height = 650 - margin.top - margin.bottom,
          // gridSize = Math.floor(width / 8),
          gridSize = 70
          // colors = custom;
          buckets = colors.length,
          legendElementWidth = width/buckets,

          
      d3.tsv(file_name,
        function(d) {
          return {
            AcqWeek: +d.AcqWeek,
            WeeksAfterInstall: +d.WeeksAfterInstall,
            percent: +d.percent
          };
        },
        function(error, data) {
          var colorScale = d3.scale.quantile()
              .domain([50, buckets - 1, d3.max(data, function (d) { return d.percent; })])
              .range(colors);

          var svg = d3.select(fill_content).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          var xAxis = svg.selectAll(".xAxis")
              .data(xAxisNames)
                .enter().append("g")
                .attr("class", ".xAxis")

          var xAxisRects = xAxis.append("rect")
              .attr("x", function(d, i) { return ( i*gridSize - gridSize); })
              .attr("y", function(d, i) { return (- gridSize/2); })
              // .attr("rx", 4)
              // .attr("ry", 4)
              .attr("width", gridSize)
              .attr("height", gridSize/2)
              .attr("class", "xAxisRect border")
              .attr("fill",function(d, i) { if (i == 0){return "#778899"} else {return "white"}; })

          var xAxisLabels = xAxis.append("text")
              .attr("class", "mono xAxisText")
              .text(function(d,i) { return xAxisNames[i] })
              .attr("x", function(d, i) { var xval = i*gridSize - gridSize; if (i==0){ return xval+7 } else {return xval+25}})
              .attr("y", function(d, i) { return (- gridSize/2 +23); })


          var yAxis = svg.selectAll(".yAxis")
              .data(yAxisNames)
                .enter().append("g")
                .attr("class", ".yAxis")

          var yAxisRects = yAxis.append("rect")
              .attr("x", function(d, i) { return ( - gridSize); })
              .attr("y", function(d, i) { return (i*gridSize/2); })
              // .attr("rx", 4)
              // .attr("ry", 4)
              .attr("width", gridSize)
              .attr("height", gridSize/2)
              .attr("class", "yAxisRect border")
              .attr("fill","white")

          var yAxisLabels = yAxis.append("text")
              .attr("class", "mono yAxisText")
              .text(function(d,i) { return yAxisNames[i] })
              .attr("x", function(d, i) { return ( - gridSize + 10); })
              .attr("y", function(d, i) { return (i * gridSize/2 + 23); })

          var cohort = svg.selectAll(".cohort")
              .data(data)
              .enter().append("rect")
              .attr("x", function(d) { return (d.WeeksAfterInstall - 1) * gridSize; })
              .attr("y", function(d) { return (d.AcqWeek - 1) * gridSize/2; })
              // .attr("rx", 4)
              // .attr("ry", 4)
              .attr("class", "cohort bor")
              .attr("width", gridSize)
              .attr("height", gridSize/2)
              .style("fill", colors[0]);

          cohort.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.percent); });

          var cohortText = svg.selectAll(".percentText")
              .data(data)
              .enter().append("text")
              .attr("x", function(d) { return d.WeeksAfterInstall * gridSize - 27})
              .attr("y", function(d) { return d.AcqWeek * gridSize/2 -4})
              .attr("class", "mono percentText")
              .text(function(d) { return d.percent+"%"; });

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d) { return d; })
              .enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i - gridSize; })
            .attr("y", (yAxisNames.length * gridSize/2) + gridSize )
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 4)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono legendText")
            .text(function(d) { return "≥ " + Math.round(d)+"%"; })
            .attr("x", function(d, i) { return legendElementWidth * i - gridSize; })
            .attr("y", (yAxisNames.length * gridSize/2) + 1.5*gridSize );
              
      });
})(d3);
