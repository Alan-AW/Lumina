from device.models import MessageQueueModel


def message_db_data(message):
    MessageQueueModel.objects.create(content=message)
    return True
