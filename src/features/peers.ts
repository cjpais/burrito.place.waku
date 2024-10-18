// TODO need to add secret?
// TODO allow data query endpoint without secret?

export type BurritoPeer = {
  name: string;
  display: string;
  url: string;
  // token: string;
};

const PEER_NAMES = [
  "alex",
  "austin",
  "baylynne",
  "caroline",
  "chandler",
  "dham",
  "gorum",
  "jon",
  "jordan",
  "kevin",
  "kristen",
  "psql",
  "savkruger",
  "taylor",
  "tom",
  "cj",
  "magic",
];

export const PEERS: BurritoPeer[] = PEER_NAMES.map((name) => ({
  name,
  display: `${name}.burrito`,
  url: `https://${name}.burrito.place`,
}));

// THIS IS ATROCIOUS
export const getAuth = (peer: string) => {
  const peersAuth = process.env.PEERS_AUTH;
  if (!peersAuth) throw new Error("PEERS_AUTH not set");

  try {
    const json = JSON.parse(peersAuth);
    return json[peer];
  } catch (e) {
    throw new Error("PEERS_AUTH is not valid JSON");
  }
};

// SAME WITH THIS
export const validateAuth = (token: string) => {
  const peersAuth = process.env.PEERS_AUTH;
  if (!peersAuth) throw new Error("PEERS_AUTH not set");

  try {
    const json = JSON.parse(peersAuth);
    const pairs = Object.entries(json);

    for (let i = 0; i < pairs.length; i++) {
      const [peer, auth] = pairs[i];
      if (auth === token) return PEERS.find((p) => p.name === peer);
    }

    return undefined;
  } catch (e) {
    throw new Error("PEERS_AUTH is not valid JSON");
  }
};
