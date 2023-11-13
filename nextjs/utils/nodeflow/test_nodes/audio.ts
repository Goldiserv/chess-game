// const context = new AudioContext();
const nodes = new Map();

export function onAudioConnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  // source.connect(target);
}

export function onAudioDisconnect(sourceId, targetId) {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  // source.disconnect(target);
}
