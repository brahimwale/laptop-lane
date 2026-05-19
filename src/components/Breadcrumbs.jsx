import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            <Home size={16} />
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <>
                  <Link to={item.path} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <ChevronRight size={14} className="breadcrumb-separator" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function useBreadcrumbs() {
  return Breadcrumbs
}

export default Breadcrumbs