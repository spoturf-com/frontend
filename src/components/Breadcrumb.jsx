import { Link } from 'react-router-dom';
const Breadcrumb = ({ turfName }) => {
  return (
    <div className="mb-6 px-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-3xl font-semibold text-black dark:text-white">
        {turfName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            {(<Link className="font-medium" to="/booking">
              Turfs /
            </Link>)}
          </li>
          <li className="font-medium text-primary">{turfName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
