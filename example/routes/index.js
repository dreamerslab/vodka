exports.get = function ( req, res ){
  res.json({ msg : '[get] test passed' });
};

exports.post = function ( req, res ){
  res.json({ msg : '[post] test passed' });
};

exports.put = function ( req, res ){
  res.json({ msg : '[put] test passed' });
};

exports.destroy = function ( req, res ){
  res.json({ msg : '[delete] test passed' });
};