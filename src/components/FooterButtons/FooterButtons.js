import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "carbon-components-react";
import { Link } from "react-router-dom";

const cssBase = "footerButtons";

export default class FooterButtons extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    secondaryLabel: PropTypes.string,
    secondaryRoute: PropTypes.string,
    onSecondaryClick: PropTypes.func,
    primaryLabel: PropTypes.string,
    primaryRoute: PropTypes.string,
    onPrimaryClick: PropTypes.func,
  };

  render() {
    const {
      className,
      secondaryLabel,
      secondaryRoute,
      onSecondaryClick,
      primaryLabel,
      primaryRoute,
      onPrimaryClick,
    } = this.props;

    return (
      <div className={classnames(cssBase, className)}>
        {secondaryLabel != null && (
          <Button
            className={`${cssBase}__button`}
            kind="secondary"
            size="small"
            as={secondaryRoute != null ? Link : null}
            to={secondaryRoute}
            onClick={onSecondaryClick}
            aria-label={secondaryLabel}
          >
            {secondaryLabel}
          </Button>
        )}
        {primaryLabel != null && (
          <Button
            className={`${cssBase}__button`}
            kind="primary"
            size="small"
            as={primaryRoute != null ? Link : null}
            to={primaryRoute}
            onClick={onPrimaryClick}
            aria-label={primaryLabel}
          >
            {primaryLabel}
          </Button>
        )}
      </div>
    );
  }
}
