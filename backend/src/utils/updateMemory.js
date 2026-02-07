function extractLifeSignals(text) {
  const signals = {
    problems: [],
    fears: [],
    desires: []
  };

  if (text.match(/pain|suffering|stress|lost/i))
    signals.problems.push(text);

  if (text.match(/fear|anxiety|afraid/i))
    signals.fears.push(text);

  if (text.match(/want|wish|desire/i))
    signals.desires.push(text);

  return signals;
}

module.exports = { extractLifeSignals };