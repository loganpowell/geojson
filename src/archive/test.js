const fetch = require('node-fetch')

const URL = 'https://api.census.gov/data/2015/acs/acs5?get=NAME,B01001_001E,GEO_ID&for=county:*&in=state:01'

fetch(URL)
.then(res => res.json())
.then (json => {
  // console.log(json)
  let result = json.filter(i => i[2] === "0500000US01105")
  console.log(result)
})
.catch(() => console.log("error!"))

/* response
[ [ 'NAME', 'B01001_001E', 'state', 'county' ],
  [ 'Autauga County, Alabama', '55221', '01', '001' ],
  [ 'Baldwin County, Alabama', '195121', '01', '003' ],
  [ 'Barbour County, Alabama', '26932', '01', '005' ],
  [ 'Bibb County, Alabama', '22604', '01', '007' ],
  [ 'Blount County, Alabama', '57710', '01', '009' ],
  [ 'Bullock County, Alabama', '10678', '01', '011' ],
  [ 'Butler County, Alabama', '20354', '01', '013' ],
  [ 'Calhoun County, Alabama', '116648', '01', '015' ],
  [ 'Chambers County, Alabama', '34079', '01', '017' ],
  [ 'Cherokee County, Alabama', '26008', '01', '019' ],
  [ 'Chilton County, Alabama', '43819', '01', '021' ],
  [ 'Choctaw County, Alabama', '13395', '01', '023' ],
  [ 'Clarke County, Alabama', '25070', '01', '025' ],
  [ 'Clay County, Alabama', '13537', '01', '027' ],
  [ 'Cleburne County, Alabama', '15002', '01', '029' ],
  [ 'Coffee County, Alabama', '50884', '01', '031' ],
  [ 'Colbert County, Alabama', '54444', '01', '033' ],
  [ 'Conecuh County, Alabama', '12865', '01', '035' ],
  [ 'Coosa County, Alabama', '11027', '01', '037' ],
  [ 'Covington County, Alabama', '37886', '01', '039' ],
  [ 'Crenshaw County, Alabama', '13938', '01', '041' ],
  [ 'Cullman County, Alabama', '80965', '01', '043' ],
  [ 'Dale County, Alabama', '49866', '01', '045' ],
  [ 'Dallas County, Alabama', '42154', '01', '047' ],
  [ 'DeKalb County, Alabama', '71068', '01', '049' ],
  [ 'Elmore County, Alabama', '80763', '01', '051' ],
  [ 'Escambia County, Alabama', '37935', '01', '053' ],
  [ 'Etowah County, Alabama', '103766', '01', '055' ],
  [ 'Fayette County, Alabama', '16896', '01', '057' ],
  [ 'Franklin County, Alabama', '31634', '01', '059' ],
  [ 'Geneva County, Alabama', '26815', '01', '061' ],
  [ 'Greene County, Alabama', '8697', '01', '063' ],
  [ 'Hale County, Alabama', '15256', '01', '065' ],
  [ 'Henry County, Alabama', '17252', '01', '067' ],
  [ 'Houston County, Alabama', '103534', '01', '069' ],
  [ 'Jackson County, Alabama', '52860', '01', '071' ],
  [ 'Jefferson County, Alabama', '659026', '01', '073' ],
  [ 'Lamar County, Alabama', '14133', '01', '075' ],
  [ 'Lauderdale County, Alabama', '92737', '01', '077' ],
  [ 'Lawrence County, Alabama', '33586', '01', '079' ],
  [ 'Lee County, Alabama', '150982', '01', '081' ],
  [ 'Limestone County, Alabama', '88805', '01', '083' ],
  [ 'Lowndes County, Alabama', '10742', '01', '085' ],
  [ 'Macon County, Alabama', '20018', '01', '087' ],
  [ 'Madison County, Alabama', '346438', '01', '089' ],
  [ 'Marengo County, Alabama', '20306', '01', '091' ],
  [ 'Marion County, Alabama', '30387', '01', '093' ],
  [ 'Marshall County, Alabama', '94318', '01', '095' ],
  [ 'Mobile County, Alabama', '414251', '01', '097' ],
  [ 'Monroe County, Alabama', '22217', '01', '099' ],
  [ 'Montgomery County, Alabama', '228138', '01', '101' ],
  [ 'Morgan County, Alabama', '119786', '01', '103' ],
  [ 'Perry County, Alabama', '10038', '01', '105' ],
  [ 'Pickens County, Alabama', '19856', '01', '107' ],
  [ 'Pike County, Alabama', '33155', '01', '109' ],
  [ 'Randolph County, Alabama', '22648', '01', '111' ],
  [ 'Russell County, Alabama', '58302', '01', '113' ],
  [ 'St. Clair County, Alabama', '85864', '01', '115' ],
  [ 'Shelby County, Alabama', '203530', '01', '117' ],
  [ 'Sumter County, Alabama', '13341', '01', '119' ],
  [ 'Talladega County, Alabama', '81437', '01', '121' ],
  [ 'Tallapoosa County, Alabama', '41153', '01', '123' ],
  [ 'Tuscaloosa County, Alabama', '200458', '01', '125' ],
  [ 'Walker County, Alabama', '65923', '01', '127' ],
  [ 'Washington County, Alabama', '16997', '01', '129' ],
  [ 'Wilcox County, Alabama', '11235', '01', '131' ],
  [ 'Winston County, Alabama', '24130', '01', '133' ]
]
*/
