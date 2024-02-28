const isObjectEmpty = objectName => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};
const getChatId = (userId1, userId2) => {
  const userIds = [userId1, userId2].sort();
  return userIds.join('-');
};
const renderMessageTime = timestamp => {
  const messageTime = timestamp?.toDate();
  const now = new Date();
  const diff = Math.abs(now - messageTime);

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  return messageTime.toLocaleString(); // Show full date if more than 24 hours
};

export {isObjectEmpty, getChatId, renderMessageTime};
