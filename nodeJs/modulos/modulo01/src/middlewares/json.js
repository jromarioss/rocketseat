export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) { // percorre cada pedaço da stream e add no buffer
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');
}
