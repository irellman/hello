from datetime import datetime

def getPublishedDate(date):
  now = datetime.now()
  months = {
    1: ' января ',
    2: ' февраля ',
    3: ' марта ',
    4: ' апреля ',
    5: ' мая ',
    6: ' июня ',
    7: ' июля ',
    8: ' августа ',
    9: ' сентября ',
    10: ' октября ',
    11: ' ноября ',
    12: ' декабря ',
  }
  result = ''
  
  if now.year != date.year:
    result += str(date.day) + months[date.month] + str(date.year) + ' г.'
  else:
    result += str(date.day) + months[date.month]
    
  result += 'в ' + str(date.hour) + ':' + str(get_minutes(date.minute))

  return result

def get_minutes(minutes):
  if minutes < 10:
    return "0" + str(minutes)
  else:
    return minutes