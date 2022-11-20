// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
type Body = {
  username: string;
  password: string;
};

export async function loginUser(body: Body) {
  const res = await fetch('http://localhost:4000/auth', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: body.username,
      password: body.password,
    }),
    method: 'POST',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}

export async function createUser(body: Body) {
  const res = await fetch('http://localhost:4000/users', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: body.username,
      password: body.password,
    }),
    method: 'POST',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res.json();
}
