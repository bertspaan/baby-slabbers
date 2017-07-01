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
      .delay(1000)
      .style('opacity', 1)

    d3.select('#percentage')
      .style('opacity', 1)
      .transition()
      .duration(1000)
      .delay(1000)
      .style('opacity', 0)
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
      lowerCurtains()
    })
}

function lowerCurtains () {
  d3.select('#curtains')
    .style('display', 'block')
    .style('top', '-100%')
    .transition()
    .delay(1000)
    .duration(2000)
    .style('top', '0%')
    .on('end', function () {
      showFrames()
    })
}

function openCurtains () {
  d3.select('#curtain-left-back')
    .transition()
    .delay(1000)
    .duration(2000)
    .style('left', '-100%')

  d3.select('#curtain-right-back')
    .transition()
    .delay(1000)
    .duration(2000)
    .style('right', '-100%')

  d3.select('#curtain-left-front')
    .transition()
    .delay(2000)
    .duration(2000)
    .style('left', '-100%')

  d3.select('#curtain-right-front')
    .transition()
    .delay(2000)
    .duration(2000)
    .style('right', '-100%')
    .on('end', function () {
      d3.select('#curtains').remove()
    })
}

function showFrames () {
  var date = moment().format('DD MMMM YYYY')
  d3.select('#frame-data-date')
    .html(date)

  if (baby.foto) {
    d3.select('#frame-photo')
    .style('background-image', 'url(' + baby.foto + ')')
  } else {
    d3.select('#frame-photo').remove()
  }

  d3.select('#frame-data-name')
    .html(baby.naam)

  d3.select('#born')
    .style('display', 'block')
    .style('opacity', '0')

  d3.select('#born')
    .transition()
    .duration(1000)
    .style('opacity', '1')

  openCurtains()

  d3.select('#guestbook')
    .on('click', function () {
      d3.select('#guestbook')
        .transition()
        .duration(1000)
        .style('opacity', '0')
        .on('end', function () {
          d3.select('#guestbook')
            .style('display', 'none')
        })
    })

  d3.select('#open-guestbook')
    .on('click', function () {
      d3.select('#guestbook')
        .style('display', 'block')
        .style('opacity', '0')
        .transition()
        .duration(1000)
        .style('opacity', '1')
    })

  setTimeout(function () {
    d3.selectAll('#born li')
    .each(function () {
      var deg = Math.round(Math.random() * 4) + 2
      var sign = Math.random() < 0.5 ? -1 : 1
      var x = Math.round(deg * -sign + 50)
      d3.select(this)
        .style('transform-origin', x + '% 20px')
        .style('transform', 'rotate(' + deg * sign + 'deg)')
    })
  }, 100)
}
