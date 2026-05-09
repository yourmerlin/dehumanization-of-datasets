const MONTHS = ["2022-10","2022-11","2022-12","2023-01","2023-02","2023-03","2023-04","2023-05","2023-06","2023-07","2023-08","2023-09","2023-10","2023-11","2023-12","2024-01","2024-02","2024-03","2024-04","2024-05","2024-06","2024-07","2024-08","2024-09","2024-10","2024-11","2024-12","2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03"];

const MONTHLY_TOTALS = [12062,12045,11108,12947,11711,11833,9727,9787,9122,8496,8137,7199,6860,6352,7002,6319,7124,7063,7612,7514,6380,7036,6890,6300,7513,6441,6511,9826,14230,15454,14795,19016,27395,26756,27878,32683,37191,34632,39729,37272,29622,10232];

const BY_MONTH_STATE = {"2022-10":{"NY":2788,"NJ":2063,"FL":2316,"IN":227,"CA":2085,"TX":1903,"WA":337,"MN":194,"TN":379,"RI":36,"NC":276,"CO":348,"MD":311,"MO":195,"LA":338,"PA":497,"WV":22,"SC":156,"IL":368,"AL":197,"VA":287,"MI":116,"GA":429,"OH":183,"MA":390,"MS":83,"WI":60,"UT":163,"OK":174,"NE":54,"AZ":327,"CT":38,"ID":17,"SD":16,"AR":98,"IA":76,"NV":113,"KS":99,"KY":107,"NM":121,"DE":22,"OR":32,"DC":95},"2022-11":{"NY":2688,"NJ":2091,"FL":2261,"IN":226,"CA":2018,"TX":1789,"WA":340,"MN":195,"TN":394,"RI":37,"NC":269,"CO":361,"MD":298,"MO":192,"LA":324,"PA":481,"WV":23,"SC":152,"IL":352,"AL":192,"VA":280,"MI":110,"GA":421,"OH":174,"MA":378,"MS":78,"WI":59,"UT":156,"OK":171,"NE":51,"AZ":319,"CT":38,"ID":17,"SD":15,"AR":98,"IA":72,"NV":110,"KS":96,"KY":105,"NM":116,"DE":22,"OR":31,"DC":90},"2022-12":{"NY":2420,"NJ":1862,"FL":2015,"IN":195,"CA":1809,"TX":1614,"WA":299,"MN":168,"TN":355,"RI":31,"NC":244,"CO":317,"MD":265,"MO":167,"LA":289,"PA":427,"WV":20,"SC":133,"IL":313,"AL":166,"VA":246,"MI":97,"GA":374,"OH":151,"MA":335,"MS":68,"WI":51,"UT":135,"OK":151,"NE":44,"AZ":282,"CT":33,"ID":15,"SD":13,"AR":87,"IA":62,"NV":96,"KS":84,"KY":93,"NM":101,"DE":19,"OR":28,"DC":80},"2023-01":{"NY":2980,"NJ":2189,"FL":2417,"IN":233,"CA":2174,"TX":1960,"WA":360,"MN":200,"TN":421,"RI":40,"NC":293,"CO":378,"MD":320,"MO":201,"LA":348,"PA":511,"WV":24,"SC":162,"IL":376,"AL":200,"VA":296,"MI":116,"GA":449,"OH":183,"MA":401,"MS":81,"WI":62,"UT":163,"OK":181,"NE":52,"AZ":338,"CT":40,"ID":19,"SD":16,"AR":104,"IA":75,"NV":117,"KS":103,"KY":112,"NM":121,"DE":23,"OR":33,"DC":96},"2023-02":{"NY":2726,"NJ":1996,"FL":2208,"IN":213,"CA":1986,"TX":1787,"WA":331,"MN":183,"TN":383,"RI":36,"NC":267,"CO":345,"MD":292,"MO":183,"LA":318,"PA":467,"WV":22,"SC":147,"IL":344,"AL":183,"VA":270,"MI":106,"GA":409,"OH":167,"MA":367,"MS":74,"WI":57,"UT":148,"OK":166,"NE":48,"AZ":309,"CT":36,"ID":17,"SD":15,"AR":95,"IA":68,"NV":106,"KS":94,"KY":102,"NM":111,"DE":21,"OR":30,"DC":88},"2023-03":{"NY":2748,"NJ":2010,"FL":2217,"IN":214,"CA":1998,"TX":1797,"WA":333,"MN":184,"TN":386,"RI":37,"NC":269,"CO":347,"MD":294,"MO":184,"LA":320,"PA":469,"WV":22,"SC":148,"IL":346,"AL":184,"VA":272,"MI":107,"GA":412,"OH":168,"MA":369,"MS":74,"WI":57,"UT":149,"OK":167,"NE":48,"AZ":310,"CT":37,"ID":17,"SD":15,"AR":95,"IA":68,"NV":107,"KS":94,"KY":103,"NM":112,"DE":21,"OR":30,"DC":88},"2023-04":{"NY":2396,"NJ":1765,"FL":1944,"IN":188,"CA":1741,"TX":1570,"WA":291,"MN":162,"TN":339,"RI":33,"NC":237,"CO":304,"MD":258,"MO":161,"LA":281,"PA":412,"WV":19,"SC":131,"IL":302,"AL":161,"VA":238,"MI":93,"GA":361,"OH":147,"MA":323,"MS":65,"WI":50,"UT":132,"OK":147,"NE":42,"AZ":272,"CT":32,"ID":16,"SD":13,"AR":83,"IA":60,"NV":93,"KS":82,"KY":91,"NM":98,"DE":18,"OR":26,"DC":77},"2023-05":{"NY":2397,"NJ":1758,"FL":1935,"IN":190,"CA":1743,"TX":1566,"WA":289,"MN":161,"TN":337,"RI":32,"NC":237,"CO":304,"MD":258,"MO":161,"LA":281,"PA":413,"WV":20,"SC":132,"IL":303,"AL":161,"VA":238,"MI":94,"GA":363,"OH":148,"MA":323,"MS":65,"WI":50,"UT":132,"OK":147,"NE":43,"AZ":272,"CT":32,"ID":16,"SD":14,"AR":83,"IA":60,"NV":93,"KS":82,"KY":91,"NM":98,"DE":18,"OR":26,"DC":77},"2023-06":{"NY":2232,"NJ":1638,"FL":1803,"IN":176,"CA":1623,"TX":1460,"WA":270,"MN":150,"TN":313,"RI":30,"NC":220,"CO":283,"MD":239,"MO":150,"LA":261,"PA":384,"WV":18,"SC":122,"IL":282,"AL":150,"VA":222,"MI":87,"GA":337,"OH":137,"MA":300,"MS":60,"WI":47,"UT":122,"OK":136,"NE":40,"AZ":254,"CT":30,"ID":15,"SD":13,"AR":78,"IA":55,"NV":87,"KS":76,"KY":84,"NM":91,"DE":17,"OR":24,"DC":72},"2023-07":{"NY":2082,"NJ":1527,"FL":1680,"IN":162,"CA":1513,"TX":1360,"WA":251,"MN":140,"TN":292,"RI":28,"NC":205,"CO":264,"MD":224,"MO":140,"LA":244,"PA":358,"WV":17,"SC":114,"IL":263,"AL":140,"VA":207,"MI":81,"GA":315,"OH":128,"MA":280,"MS":56,"WI":43,"UT":114,"OK":127,"NE":37,"AZ":237,"CT":27,"ID":14,"SD":12,"AR":72,"IA":52,"NV":81,"KS":71,"KY":79,"NM":85,"DE":16,"OR":22,"DC":67},"2023-08":{"NY":1997,"NJ":1464,"FL":1611,"IN":155,"CA":1451,"TX":1306,"WA":241,"MN":134,"TN":279,"RI":27,"NC":196,"CO":253,"MD":214,"MO":134,"LA":234,"PA":344,"WV":16,"SC":109,"IL":252,"AL":134,"VA":198,"MI":78,"GA":302,"OH":123,"MA":268,"MS":54,"WI":41,"UT":110,"OK":122,"NE":36,"AZ":227,"CT":27,"ID":13,"SD":11,"AR":69,"IA":50,"NV":77,"KS":68,"KY":75,"NM":82,"DE":15,"OR":21,"DC":64},"2023-09":{"NY":1758,"NJ":1289,"FL":1421,"IN":137,"CA":1277,"TX":1149,"WA":213,"MN":118,"TN":246,"RI":23,"NC":173,"CO":223,"MD":189,"MO":118,"LA":206,"PA":303,"WV":14,"SC":96,"IL":222,"AL":118,"VA":175,"MI":68,"GA":266,"OH":108,"MA":237,"MS":47,"WI":37,"UT":96,"OK":107,"NE":31,"AZ":200,"CT":23,"ID":12,"SD":10,"AR":61,"IA":44,"NV":68,"KS":60,"KY":67,"NM":72,"DE":14,"OR":19,"DC":56},"2023-10":{"NY":1666,"NJ":1218,"FL":1346,"IN":131,"CA":1211,"TX":1089,"WA":201,"MN":112,"TN":234,"RI":22,"NC":163,"CO":210,"MD":179,"MO":112,"LA":195,"PA":287,"WV":14,"SC":91,"IL":211,"AL":112,"VA":166,"MI":65,"GA":253,"OH":103,"MA":225,"MS":45,"WI":35,"UT":91,"OK":101,"NE":30,"AZ":190,"CT":22,"ID":11,"SD":9,"AR":57,"IA":42,"NV":65,"KS":57,"KY":63,"NM":69,"DE":13,"OR":18,"DC":54},"2023-11":{"NY":1550,"NJ":1131,"FL":1249,"IN":122,"CA":1123,"TX":1011,"WA":186,"MN":104,"TN":218,"RI":20,"NC":152,"CO":196,"MD":166,"MO":104,"LA":181,"PA":267,"WV":13,"SC":84,"IL":196,"AL":104,"VA":154,"MI":60,"GA":235,"OH":95,"MA":209,"MS":42,"WI":32,"UT":84,"OK":94,"NE":28,"AZ":176,"CT":20,"ID":10,"SD":9,"AR":53,"IA":39,"NV":60,"KS":53,"KY":59,"NM":64,"DE":12,"OR":17,"DC":50},"2023-12":{"NY":1709,"NJ":1253,"FL":1379,"IN":134,"CA":1240,"TX":1115,"WA":207,"MN":115,"TN":240,"RI":23,"NC":168,"CO":216,"MD":183,"MO":115,"LA":200,"PA":294,"WV":14,"SC":93,"IL":216,"AL":115,"VA":170,"MI":67,"GA":259,"OH":106,"MA":231,"MS":47,"WI":36,"UT":94,"OK":104,"NE":31,"AZ":194,"CT":23,"ID":11,"SD":10,"AR":59,"IA":43,"NV":66,"KS":58,"KY":65,"NM":71,"DE":13,"OR":18,"DC":55},"2024-01":{"NY":1514,"NJ":1109,"FL":1226,"IN":120,"CA":1094,"TX":986,"WA":182,"MN":101,"TN":213,"RI":21,"NC":149,"CO":193,"MD":163,"MO":103,"LA":178,"PA":262,"WV":13,"SC":83,"IL":192,"AL":102,"VA":151,"MI":59,"GA":231,"OH":94,"MA":206,"MS":41,"WI":33,"UT":84,"OK":93,"NE":28,"AZ":172,"CT":20,"ID":10,"SD":9,"AR":54,"IA":39,"NV":59,"KS":52,"KY":58,"NM":63,"DE":12,"OR":16,"DC":49},"2024-02":{"NY":1744,"NJ":1272,"FL":1399,"IN":136,"CA":1261,"TX":1133,"WA":210,"MN":117,"TN":244,"RI":23,"NC":171,"CO":220,"MD":187,"MO":117,"LA":204,"PA":301,"WV":14,"SC":95,"IL":220,"AL":117,"VA":173,"MI":68,"GA":266,"OH":108,"MA":236,"MS":48,"WI":37,"UT":96,"OK":107,"NE":31,"AZ":198,"CT":23,"ID":12,"SD":10,"AR":62,"IA":44,"NV":68,"KS":60,"KY":67,"NM":72,"DE":14,"OR":19,"DC":56},"2024-03":{"NY":1709,"NJ":1253,"FL":1381,"IN":135,"CA":1244,"TX":1117,"WA":207,"MN":115,"TN":241,"RI":23,"NC":170,"CO":218,"MD":184,"MO":115,"LA":201,"PA":297,"WV":14,"SC":94,"IL":218,"AL":115,"VA":170,"MI":67,"GA":262,"OH":107,"MA":233,"MS":47,"WI":37,"UT":95,"OK":106,"NE":31,"AZ":195,"CT":23,"ID":12,"SD":10,"AR":61,"IA":44,"NV":67,"KS":59,"KY":66,"NM":71,"DE":13,"OR":19,"DC":55},"2024-04":{"NY":1828,"NJ":1339,"FL":1474,"IN":144,"CA":1329,"TX":1195,"WA":220,"MN":123,"TN":257,"RI":24,"NC":181,"CO":233,"MD":197,"MO":124,"LA":215,"PA":316,"WV":15,"SC":101,"IL":234,"AL":124,"VA":182,"MI":71,"GA":279,"OH":114,"MA":249,"MS":50,"WI":39,"UT":102,"OK":113,"NE":33,"AZ":207,"CT":25,"ID":12,"SD":11,"AR":65,"IA":47,"NV":71,"KS":63,"KY":70,"NM":76,"DE":14,"OR":20,"DC":59},"2024-05":{"NY":1792,"NJ":1308,"FL":1434,"IN":141,"CA":1297,"TX":1167,"WA":215,"MN":120,"TN":252,"RI":24,"NC":177,"CO":228,"MD":192,"MO":121,"LA":210,"PA":309,"WV":15,"SC":98,"IL":228,"AL":121,"VA":179,"MI":70,"GA":273,"OH":111,"MA":243,"MS":49,"WI":38,"UT":100,"OK":111,"NE":32,"AZ":202,"CT":24,"ID":12,"SD":10,"AR":63,"IA":46,"NV":70,"KS":61,"KY":69,"NM":74,"DE":14,"OR":19,"DC":58},"2024-06":{"NY":1527,"NJ":1117,"FL":1231,"IN":120,"CA":1107,"TX":996,"WA":184,"MN":102,"TN":215,"RI":20,"NC":151,"CO":194,"MD":164,"MO":103,"LA":179,"PA":264,"WV":13,"SC":84,"IL":195,"AL":103,"VA":153,"MI":60,"GA":233,"OH":95,"MA":208,"MS":42,"WI":33,"UT":85,"OK":95,"NE":28,"AZ":173,"CT":20,"ID":10,"SD":9,"AR":54,"IA":39,"NV":60,"KS":52,"KY":59,"NM":63,"DE":12,"OR":16,"DC":49},"2024-07":{"NY":1685,"NJ":1232,"FL":1357,"IN":133,"CA":1221,"TX":1098,"WA":203,"MN":113,"TN":237,"RI":22,"NC":166,"CO":214,"MD":181,"MO":114,"LA":198,"PA":291,"WV":14,"SC":93,"IL":215,"AL":113,"VA":168,"MI":66,"GA":257,"OH":105,"MA":230,"MS":46,"WI":36,"UT":94,"OK":105,"NE":31,"AZ":190,"CT":22,"ID":11,"SD":10,"AR":60,"IA":43,"NV":66,"KS":58,"KY":64,"NM":70,"DE":13,"OR":18,"DC":54},"2024-08":{"NY":1644,"NJ":1204,"FL":1327,"IN":129,"CA":1191,"TX":1072,"WA":198,"MN":110,"TN":231,"RI":22,"NC":162,"CO":209,"MD":177,"MO":111,"LA":193,"PA":284,"WV":14,"SC":91,"IL":210,"AL":110,"VA":164,"MI":64,"GA":251,"OH":102,"MA":224,"MS":45,"WI":35,"UT":92,"OK":102,"NE":30,"AZ":186,"CT":22,"ID":11,"SD":10,"AR":58,"IA":42,"NV":65,"KS":57,"KY":63,"NM":68,"DE":13,"OR":17,"DC":53},"2024-09":{"NY":1497,"NJ":1096,"FL":1212,"IN":118,"CA":1086,"TX":977,"WA":180,"MN":101,"TN":211,"RI":20,"NC":148,"CO":191,"MD":162,"MO":101,"LA":176,"PA":259,"WV":13,"SC":83,"IL":192,"AL":101,"VA":150,"MI":58,"GA":228,"OH":93,"MA":204,"MS":41,"WI":32,"UT":83,"OK":93,"NE":27,"AZ":169,"CT":20,"ID":10,"SD":9,"AR":53,"IA":38,"NV":59,"KS":52,"KY":57,"NM":62,"DE":12,"OR":16,"DC":48},"2024-10":{"NY":1799,"NJ":1316,"FL":1449,"IN":141,"CA":1303,"TX":1172,"WA":217,"MN":121,"TN":252,"RI":24,"NC":178,"CO":228,"MD":193,"MO":121,"LA":210,"PA":308,"WV":15,"SC":98,"IL":228,"AL":121,"VA":178,"MI":70,"GA":274,"OH":111,"MA":243,"MS":49,"WI":38,"UT":100,"OK":111,"NE":33,"AZ":203,"CT":24,"ID":12,"SD":10,"AR":64,"IA":46,"NV":70,"KS":61,"KY":68,"NM":73,"DE":14,"OR":19,"DC":58},"2024-11":{"NY":1545,"NJ":1131,"FL":1248,"IN":122,"CA":1120,"TX":1008,"WA":186,"MN":104,"TN":217,"RI":21,"NC":152,"CO":196,"MD":166,"MO":104,"LA":181,"PA":265,"WV":13,"SC":84,"IL":195,"AL":104,"VA":154,"MI":60,"GA":235,"OH":96,"MA":209,"MS":42,"WI":33,"UT":86,"OK":96,"NE":28,"AZ":175,"CT":21,"ID":10,"SD":9,"AR":55,"IA":40,"NV":60,"KS":53,"KY":59,"NM":63,"DE":12,"OR":16,"DC":50},"2024-12":{"NY":1562,"NJ":1143,"FL":1261,"IN":123,"CA":1132,"TX":1019,"WA":188,"MN":105,"TN":219,"RI":21,"NC":154,"CO":199,"MD":168,"MO":105,"LA":183,"PA":268,"WV":13,"SC":85,"IL":197,"AL":105,"VA":155,"MI":61,"GA":238,"OH":97,"MA":211,"MS":42,"WI":33,"UT":87,"OK":97,"NE":28,"AZ":177,"CT":21,"ID":11,"SD":9,"AR":56,"IA":40,"NV":61,"KS":53,"KY":59,"NM":64,"DE":12,"OR":16,"DC":50},"2025-01":{"NY":1988,"NJ":1478,"FL":1642,"IN":155,"CA":1497,"TX":1395,"WA":234,"MN":131,"TN":279,"RI":28,"NC":197,"CO":253,"MD":213,"MO":133,"LA":231,"PA":340,"WV":17,"SC":107,"IL":247,"AL":131,"VA":195,"MI":77,"GA":300,"OH":122,"MA":267,"NH":16,"MS":53,"WI":42,"UT":111,"OK":124,"NE":36,"AZ":221,"CT":27,"ID":14,"SD":12,"AR":71,"ME":12,"IA":51,"MT":8,"NV":79,"KS":66,"KY":75,"WY":12,"NM":82,"DE":16,"OR":20,"AK":3,"VT":2,"ND":7,"DC":62,"HI":9},"2025-02":{"NY":2703,"NJ":2082,"FL":2384,"IN":216,"CA":2086,"TX":2135,"WA":329,"MN":185,"TN":394,"RI":40,"NC":281,"CO":362,"MD":302,"MO":188,"LA":329,"PA":482,"WV":24,"SC":152,"IL":354,"AL":186,"VA":279,"MI":111,"GA":432,"OH":176,"MA":384,"NH":24,"MS":77,"WI":61,"UT":158,"OK":177,"NE":52,"AZ":321,"CT":39,"ID":20,"SD":17,"AR":101,"ME":17,"IA":72,"MT":12,"NV":113,"KS":95,"KY":107,"WY":18,"NM":118,"DE":23,"OR":29,"AK":4,"VT":2,"ND":10,"DC":88,"HI":13},"2025-03":{"NY":2957,"NJ":2265,"FL":2575,"IN":236,"CA":2285,"TX":2366,"WA":359,"MN":200,"TN":428,"RI":43,"NC":303,"CO":395,"MD":330,"MO":205,"LA":358,"PA":527,"WV":26,"SC":166,"IL":387,"AL":203,"VA":305,"MI":120,"GA":472,"OH":191,"MA":420,"NH":27,"MS":83,"WI":66,"UT":173,"OK":192,"NE":57,"AZ":350,"CT":43,"ID":22,"SD":18,"AR":110,"ME":18,"IA":79,"MT":13,"NV":124,"KS":104,"KY":117,"WY":19,"NM":129,"DE":26,"OR":32,"AK":4,"VT":3,"ND":11,"DC":96,"HI":14},"2025-04":{"NY":3019,"NJ":2281,"FL":2597,"IN":241,"CA":2313,"TX":2465,"WA":371,"MN":204,"TN":431,"RI":44,"NC":308,"CO":399,"MD":335,"MO":209,"LA":366,"PA":533,"WV":27,"SC":168,"IL":393,"AL":205,"VA":309,"MI":122,"GA":479,"OH":194,"MA":425,"NH":27,"MS":84,"WI":67,"UT":175,"OK":195,"NE":58,"AZ":356,"CT":44,"ID":23,"SD":18,"AR":112,"ME":18,"IA":80,"MT":13,"NV":126,"KS":106,"KY":118,"WY":20,"NM":131,"DE":26,"OR":32,"AK":5,"VT":3,"ND":11,"DC":98,"HI":14},"2025-05":{"NY":3814,"NJ":2878,"FL":3283,"IN":303,"CA":2919,"TX":3117,"WA":471,"MN":258,"TN":545,"RI":55,"NC":389,"CO":504,"MD":424,"MO":264,"LA":461,"PA":673,"WV":34,"SC":212,"IL":497,"AL":258,"VA":390,"MI":154,"GA":605,"OH":245,"MA":536,"NH":33,"MS":107,"WI":85,"UT":220,"OK":246,"NE":73,"AZ":449,"CT":55,"ID":28,"SD":23,"AR":141,"ME":23,"IA":101,"MT":16,"NV":158,"KS":133,"KY":149,"WY":25,"NM":166,"DE":33,"OR":40,"AK":6,"VT":4,"ND":14,"DC":124,"HI":18},"2025-06":{"NY":5282,"NJ":4038,"FL":4636,"IN":433,"CA":4115,"TX":4573,"WA":678,"MN":372,"TN":784,"RI":80,"NC":558,"CO":727,"MD":609,"MO":381,"LA":670,"PA":972,"WV":48,"SC":308,"IL":718,"AL":374,"VA":562,"MI":222,"GA":873,"OH":353,"MA":773,"NH":48,"MS":154,"WI":122,"UT":319,"OK":355,"NE":105,"AZ":651,"CT":79,"ID":41,"SD":33,"AR":204,"ME":33,"IA":145,"MT":23,"NV":229,"KS":193,"KY":215,"WY":36,"NM":240,"DE":47,"OR":58,"AK":9,"VT":6,"ND":21,"DC":178,"HI":26},"2025-07":{"NY":5141,"NJ":3937,"FL":4521,"IN":421,"CA":4008,"TX":4492,"WA":661,"MN":362,"TN":764,"RI":77,"NC":544,"CO":709,"MD":595,"MO":372,"LA":652,"PA":947,"WV":47,"SC":300,"IL":700,"AL":364,"VA":548,"MI":217,"GA":850,"OH":344,"MA":753,"NH":47,"MS":150,"WI":119,"UT":311,"OK":346,"NE":103,"AZ":634,"CT":77,"ID":40,"SD":32,"AR":198,"ME":32,"IA":141,"MT":23,"NV":223,"KS":188,"KY":210,"WY":35,"NM":234,"DE":46,"OR":57,"AK":9,"VT":5,"ND":20,"DC":174,"HI":25},"2025-08":{"NY":5291,"NJ":4039,"FL":4618,"IN":433,"CA":4116,"TX":4586,"WA":680,"MN":374,"TN":784,"RI":79,"NC":558,"CO":727,"MD":609,"MO":381,"LA":668,"PA":972,"WV":49,"SC":308,"IL":718,"AL":374,"VA":561,"MI":222,"GA":872,"OH":353,"MA":773,"NH":48,"MS":153,"WI":122,"UT":319,"OK":355,"NE":105,"AZ":651,"CT":79,"ID":41,"SD":33,"AR":204,"ME":33,"IA":145,"MT":23,"NV":229,"KS":193,"KY":215,"WY":35,"NM":240,"DE":47,"OR":58,"AK":9,"VT":5,"ND":21,"DC":178,"HI":26},"2025-09":{"NY":6310,"NJ":4823,"FL":5535,"IN":519,"CA":4920,"TX":5614,"WA":814,"MN":449,"TN":940,"RI":95,"NC":669,"CO":871,"MD":731,"MO":457,"LA":800,"PA":1163,"WV":58,"SC":368,"IL":861,"AL":450,"VA":673,"MI":266,"GA":1045,"OH":423,"MA":925,"NH":57,"MS":183,"WI":146,"UT":382,"OK":425,"NE":126,"AZ":779,"CT":95,"ID":49,"SD":40,"AR":244,"ME":39,"IA":174,"MT":27,"NV":274,"KS":231,"KY":257,"WY":42,"NM":287,"DE":57,"OR":70,"AK":10,"VT":6,"ND":25,"DC":213,"HI":31},"2025-10":{"NY":7174,"NJ":5486,"FL":6297,"IN":590,"CA":5591,"TX":6468,"WA":926,"MN":511,"TN":1068,"RI":108,"NC":760,"CO":990,"MD":831,"MO":520,"LA":910,"PA":1323,"WV":66,"SC":418,"IL":979,"AL":511,"VA":765,"MI":303,"GA":1189,"OH":481,"MA":1052,"NH":65,"MS":208,"WI":166,"UT":434,"OK":483,"NE":143,"AZ":885,"CT":108,"ID":56,"SD":45,"AR":277,"ME":44,"IA":198,"MT":31,"NV":312,"KS":263,"KY":292,"WY":48,"NM":326,"DE":64,"OR":80,"AK":12,"VT":7,"ND":28,"DC":242,"HI":36},"2025-11":{"NY":6649,"NJ":5084,"FL":5838,"IN":547,"CA":5181,"TX":6011,"WA":858,"MN":473,"TN":990,"RI":100,"NC":704,"CO":918,"MD":770,"MO":482,"LA":843,"PA":1226,"WV":62,"SC":387,"IL":907,"AL":473,"VA":709,"MI":280,"GA":1102,"OH":446,"MA":975,"NH":60,"MS":192,"WI":153,"UT":402,"OK":448,"NE":133,"AZ":820,"CT":100,"ID":52,"SD":42,"AR":256,"ME":41,"IA":183,"MT":28,"NV":289,"KS":243,"KY":271,"WY":44,"NM":302,"DE":60,"OR":74,"AK":11,"VT":7,"ND":26,"DC":225,"HI":33},"2025-12":{"NY":7635,"NJ":5835,"FL":6706,"IN":628,"CA":5956,"TX":6926,"WA":986,"MN":544,"TN":1138,"RI":115,"NC":809,"CO":1055,"MD":885,"MO":554,"LA":968,"PA":1408,"WV":71,"SC":445,"IL":1042,"AL":544,"VA":815,"MI":322,"GA":1267,"OH":513,"MA":1120,"NH":68,"MS":221,"WI":176,"UT":462,"OK":515,"NE":153,"AZ":943,"CT":115,"ID":59,"SD":48,"AR":294,"ME":47,"IA":210,"MT":32,"NV":332,"KS":279,"KY":311,"WY":51,"NM":347,"DE":69,"OR":85,"AK":13,"VT":8,"ND":30,"DC":258,"HI":38},"2026-01":{"NY":7210,"NJ":5512,"FL":6336,"IN":593,"CA":5624,"TX":6549,"WA":932,"MN":514,"TN":1075,"RI":108,"NC":764,"CO":995,"MD":836,"MO":523,"LA":914,"PA":1330,"WV":67,"SC":421,"IL":984,"AL":514,"VA":770,"MI":304,"GA":1197,"OH":484,"MA":1057,"NH":64,"MS":208,"WI":166,"UT":437,"OK":487,"NE":144,"AZ":887,"CT":108,"ID":56,"SD":45,"AR":278,"ME":44,"IA":198,"MT":31,"NV":314,"KS":264,"KY":293,"WY":48,"NM":328,"DE":64,"OR":80,"AK":12,"VT":7,"ND":28,"DC":243,"HI":36},"2026-02":{"NY":5701,"NJ":4355,"FL":5007,"IN":469,"CA":4443,"TX":5175,"WA":736,"MN":406,"TN":848,"RI":85,"NC":603,"CO":786,"MD":660,"MO":413,"LA":722,"PA":1050,"WV":53,"SC":332,"IL":777,"AL":406,"VA":608,"MI":240,"GA":944,"OH":382,"MA":834,"NH":50,"MS":164,"WI":131,"UT":344,"OK":384,"NE":113,"AZ":700,"CT":85,"ID":44,"SD":36,"AR":219,"ME":35,"IA":156,"MT":24,"NV":247,"KS":208,"KY":231,"WY":38,"NM":259,"DE":51,"OR":63,"AK":9,"VT":5,"ND":22,"DC":192,"HI":28},"2026-03":{"NY":1773,"NJ":1363,"FL":1567,"IN":147,"CA":1387,"TX":1622,"WA":231,"MN":128,"TN":265,"RI":27,"NC":190,"CO":246,"MD":208,"MO":130,"LA":227,"PA":330,"WV":17,"SC":104,"IL":245,"AL":128,"VA":191,"MI":75,"GA":296,"OH":120,"MA":263,"NH":15,"MS":52,"WI":41,"UT":108,"OK":120,"NE":36,"AZ":221,"CT":26,"ID":14,"SD":11,"AR":69,"ME":11,"IA":49,"MT":8,"NV":78,"KS":65,"KY":73,"WY":12,"NM":82,"DE":16,"OR":20,"AK":3,"VT":2,"ND":7,"DC":60,"HI":9}};

const STATE_NAME_TO_ABBR = {"Alabama":"AL","Alaska":"AK","Arizona":"AZ","Arkansas":"AR","California":"CA","Colorado":"CO","Connecticut":"CT","Delaware":"DE","Florida":"FL","Georgia":"GA","Hawaii":"HI","Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Maine":"ME","Maryland":"MD","Massachusetts":"MA","Michigan":"MI","Minnesota":"MN","Mississippi":"MS","Missouri":"MO","Montana":"MT","Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT","Virginia":"VA","Washington":"WA","West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY","District of Columbia":"DC"};

const BG = '#dde8ff';
const LAND = '#4a72d4';
const DOT = '#dde8ff';

const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
let W, H, projection, pathGen;
let statePaths = {};
let statePixels = {};
let currentIdx = 0;
let playing = false;
let timer = null;
let ready = false;

function fmtMonth(m) {
  const [y,mo] = m.split('-');
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+mo-1]+' '+y;
}

function setupCanvas() {
  const dpr = window.devicePixelRatio || 1;
  W = document.getElementById('wrap').clientWidth;
  H = Math.round(W * 0.58);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);
}

function buildProjection() {
  projection = d3.geoAlbersUsa().scale(W * 1.25).translate([W * 0.5, H * 0.5]);
  pathGen = d3.geoPath(projection, ctx);
}

function drawBase(features) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  features.forEach(f => {
    ctx.beginPath();
    pathGen(f);
    ctx.fillStyle = LAND;
    ctx.fill();
    ctx.strokeStyle = '#3a62c4';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  });
}

function buildStatePixels(features) {
  const offCanvas = document.createElement('canvas');
  offCanvas.width = W;
  offCanvas.height = H;
  const offCtx = offCanvas.getContext('2d');
  const offPath = d3.geoPath(projection, offCtx);

  features.forEach(f => {
    const name = f.properties.name;
    const abbr = STATE_NAME_TO_ABBR[name];
    if (!abbr) return;

    offCtx.clearRect(0, 0, W, H);
    offCtx.beginPath();
    offPath(f);
    offCtx.fillStyle = '#ff0000';
    offCtx.fill();

    const bbox = pathGen.bounds(f);
    const x0 = Math.max(0, Math.floor(bbox[0][0]) - 2);
    const y0 = Math.max(0, Math.floor(bbox[0][1]) - 2);
    const x1 = Math.min(W - 1, Math.ceil(bbox[1][0]) + 2);
    const y1 = Math.min(H - 1, Math.ceil(bbox[1][1]) + 2);
    const bw = x1 - x0, bh = y1 - y0;
    if (bw <= 0 || bh <= 0) return;

    const imgData = offCtx.getImageData(x0, y0, bw, bh);
    const pixels = [];
    for (let j = 0; j < bh; j++) {
      for (let i = 0; i < bw; i++) {
        if (imgData.data[(j * bw + i) * 4] > 128) {
          pixels.push([x0 + i, y0 + j]);
        }
      }
    }
    if (pixels.length > 0) statePixels[abbr] = pixels;
  });
}

function placeDots(stateAbbr, count) {
  const pixels = statePixels[stateAbbr];
  if (!pixels || pixels.length === 0) return;
  const dotR = Math.max(1, W / 700);
  ctx.fillStyle = DOT;
  for (let i = 0; i < count; i++) {
    const px = pixels[Math.floor(Math.random() * pixels.length)];
    ctx.beginPath();
    ctx.arc(px[0], px[1], dotR, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateDisplay(idx) {
  currentIdx = idx;
  let cumTotal = 0;
  for (let i = 0; i <= idx; i++) cumTotal += MONTHLY_TOTALS[i];
  document.getElementById('bigNum').textContent = cumTotal.toLocaleString();
  document.getElementById('subLine').textContent = fmtMonth(MONTHS[idx]) + ' — ' + MONTHLY_TOTALS[idx].toLocaleString() + ' this month';
  document.getElementById('timeline').value = idx;
  const pct = idx / (MONTHS.length - 1);
  document.getElementById('scrub').style.left = (pct * document.getElementById('spark').offsetWidth) + 'px';
}

function applyMonth(idx) {
  const monthData = BY_MONTH_STATE[MONTHS[idx]] || {};
  const SCALE = 20;
  for (const [abbr, raw] of Object.entries(monthData)) {
    placeDots(abbr, Math.max(1, Math.round(raw / SCALE)));
  }
}

function fullRedraw(upToIdx) {
  if (!ready) return;
  drawBase(window._usFeatures);
  for (let i = 0; i <= upToIdx; i++) applyMonth(i);
  updateDisplay(upToIdx);
}

function drawSparkline() {
  const sp = document.getElementById('spark');
  const sw = sp.offsetWidth, sh = 32;
  const dpr = window.devicePixelRatio || 1;
  sp.width = sw * dpr; sp.height = sh * dpr;
  sp.style.width = sw + 'px'; sp.style.height = sh + 'px';
  const sc = sp.getContext('2d');
  sc.scale(dpr, dpr);
  const max = Math.max(...MONTHLY_TOTALS);
  sc.beginPath();
  MONTHLY_TOTALS.forEach((v, i) => {
    const x = (i / (MONTHLY_TOTALS.length - 1)) * sw;
    const y = sh - (v / max) * (sh - 4) - 2;
    i === 0 ? sc.moveTo(x, y) : sc.lineTo(x, y);
  });
  sc.strokeStyle = '#4a72d4';
  sc.lineWidth = 1.5;
  sc.stroke();
}

d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json').then(us => {
  const features = topojson.feature(us, us.objects.states).features;
  window._usFeatures = features;
  setupCanvas();
  buildProjection();
  drawBase(features);
  buildStatePixels(features);
  ready = true;
  drawSparkline();
  updateDisplay(0);
});

document.getElementById('playBtn').addEventListener('click', () => {
  if (playing) {
    clearInterval(timer); playing = false;
    document.getElementById('playBtn').textContent = 'Play';
  } else {
    if (currentIdx >= MONTHS.length - 1) { fullRedraw(0); currentIdx = 0; }
    playing = true;
    document.getElementById('playBtn').textContent = 'Pause';
    timer = setInterval(() => {
      if (currentIdx >= MONTHS.length - 1) {
        clearInterval(timer); playing = false;
        document.getElementById('playBtn').textContent = 'Play';
        return;
      }
      currentIdx++;
      applyMonth(currentIdx);
      updateDisplay(currentIdx);
    }, 220);
  }
});

document.getElementById('timeline').addEventListener('change', e => {
  if (playing) { clearInterval(timer); playing = false; document.getElementById('playBtn').textContent = 'Play'; }
  fullRedraw(+e.target.value);
});