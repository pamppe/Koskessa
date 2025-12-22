import { Link } from "react-router-dom";
import { spots } from "../data/spots";
import PageContainer from "../components/PageContainer";


export default function ListPage() {
  return (
    <PageContainer>
      <h1>Koskessa</h1>
      <p>Valitse kohde listasta.</p>

      <div style={{ display: "grid", gap: 12 }}>
        {spots.map(s => (
          <Link key={s.id} to={`/spot/${s.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.name}</div>
              <div style={{ opacity: 0.8 }}>{s.municipality}</div>
              <div style={{ marginTop: 8 }}>{s.teaser}</div>
              {typeof s.priceFromEur === "number" && (
                <div style={{ marginTop: 8, fontWeight: 600 }}>Alk. {s.priceFromEur} €</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
