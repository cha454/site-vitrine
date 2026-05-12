import './PricingTable.css'

function PricingTable({ category, items }) {
  return (
    <section className="about-section pricing-section">
      <h2>{category}</h2>
      <div className="table-wrapper">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Tarif</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.service}</td>
                <td className="pricing-price">
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PricingTable