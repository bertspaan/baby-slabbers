var progressBarDuration = 10000

var dateDueStr = baby.uitgerekend
var dateBornStr = baby.geboren
var averageDays = 280

var msPerDay = 1000 * 3600 * 24

var dateDue = new Date(dateDueStr)
var dateNow = new Date(Date.now())
var dateBorn = dateBornStr && new Date(dateBornStr)

var dateProgress = dateBorn || dateNow

// dateProgress = new Date('09/19/2017')

var timeDiff = dateDue.getTime() - dateProgress.getTime()
var diffDays = timeDiff / msPerDay

// minDiffDays = 5

var ratio = (averageDays - diffDays) / averageDays
var percentage = roundPercentage(ratio * 100)
var completed = Math.min(100, percentage)

var averageWidth = Math.min(100, 1 / ratio * 100)

// document.getElementById('average').style.width = averageWidth + '%'
document.getElementById('average').style.width = '100%'

var completedElement = d3.select('#completed')
var percentageElement = d3.select('#percentage')

function roundPercentage (percentage) {
  return Math.round(percentage * 10) / 10
}

d3.select('#completed').transition()
    .duration(progressBarDuration)
    .tween('style:width', function () {
      var iCompleted = d3.interpolateString('0', completed)
      var iPercentage = d3.interpolateString('0', percentage)
      return function(t) {
        completedElement.style('width', iCompleted(t) + '%')
        var percentage = String(roundPercentage(iPercentage(t)))
        if (percentage.slice(-2)[0] !== '.') {
          percentage += '.0'
        }
        percentageElement.html(percentage + '%')
      }
    })
    .on('end', checkBaby)

function checkBaby () {
  if (baby.naam && baby.geboren) {
    born()
  } else {
    d3.select('#not-yet-born')
      .style('opacity', 0)
      .style('visibility', 'visible')
      .transition()
      .duration(1000)
      .style('opacity', 1)
  }
}

function born () {
  d3.select('#loading').transition()
    .delay(1000)
    .duration(1000)
    .style('transform', 'scale(50)')
    .style('opacity', '0')
    .on('end', function () {
      d3.select(this).remove()
      showFrames()
    })
}

function showFrames () {
  var date = moment().format('DD MMMM YYYY')
  d3.select('#frame-data-date')
    .html(date)

  d3.select('#frame-data-name')
    .html(baby.naam)

  d3.select('#born').style('display', 'block')

  setTimeout(function () {
    d3.selectAll('#born li')
    .each(function () {
      var deg = Math.round(Math.random() * 4) + 2
      var sign = Math.random() < 0.5 ? -1 : 1
      var x = Math.round(deg * -sign + 50)
      d3.select(this)
        .style('transform-origin', x + '% 20px')
        .style('transform', 'rotate(' + deg * sign + 'deg)')

      // transform-origin: left 2px;
      // background-image: url(../img/kuiken.jpg);
       // d3.selectAll('#born li')
       // .style('transform', 'rotate(' + (Math.floor(Math.random() * 3) + 2) + ')deg')
    })
  }, 100)
}
