import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";
import PropTypes from "prop-types";

const PaginationComp = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  // [1 ... pagesCount];

  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

// You can chain any of the above with `isRequired` to make sure a warning
// is shown if the prop isn't provided.
PaginationComp.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComp;
