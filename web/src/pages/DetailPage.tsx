import { Link, useParams } from "react-router-dom";
import { getSpot } from "../data/spots";
import PageContainer from "../components/PageContainer";

export default function DetailPage() {
  const { id } = useParams();
  const spot = id ? getSpot(id) : undefined;

  if (!spot) return <div style={{ padding: 16 }}>Kohdetta ei löytynyt.</div>;

  return (
    <PageContainer>
      <Link to="/">← Takaisin</Link>

      <h1 style={{ marginTop: 12 }}>{spot.name}</h1>
      <div style={{ opacity: 0.8 }}>{spot.municipality}</div>

      {spot.imageUrl && (
        <img
          src={spot.imageUrl}
          alt={`${spot.name} esimerkkikuva`}
          style={{
            width: "100%",
            maxHeight: 360,
            objectFit: "cover",
            borderRadius: 16,
            marginTop: 12
          }}
        />
      )}

      <p style={{ marginTop: 12 }}>{spot.teaser}</p>

      <Link to={`/spot/${spot.id}/map`}>Näytä kartalla →</Link>
    </PageContainer>
  );
}
