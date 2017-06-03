var babySlabbersDue = baby.uitgerekend
var averageDays = 280

var msPerDay = 1000 * 3600 * 24

var dateDue = new Date(babySlabbersDue)
var dateNow = new Date(Date.now())
// var dateNow = new Date('09/19/2017')

var timeDiff = dateDue.getTime() - dateNow.getTime()
var diffDays = timeDiff / msPerDay

// minDiffDays = 5

var ratio = (averageDays - diffDays) / averageDays
var percentage = ratio * 100
var completed = Math.min(100, percentage)

var averageWidth = Math.min(100, 1 / ratio * 100)

document.getElementById('completed').style.width = completed + '%'
document.getElementById('average').style.width = averageWidth + '%'
document.getElementById('percentage').innerHTML = Math.round(percentage) + '%'

// d3.select("body").transition()
//     .delay(750)
//     .each("start", function() { d3.select(this).style("color", "green"); })
//     .style("color", "red");
