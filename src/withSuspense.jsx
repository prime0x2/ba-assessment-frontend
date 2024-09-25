import React from "react";
import Loader from "@/components/Loader";

/**
 * Higher-Order Component (HOC) to wrap a given component with React Suspense.
 * Displays a Loader component as a fallback while the wrapped component is loading.
 *
 * @param {React.ComponentType} Component - The component to be wrapped with Suspense.
 * @returns {React.FC} - A new component wrapped with React Suspense.
 */
const withSuspense = (Component) => {
  const SuspenseComponent = (props) => {
    return (
      <React.Suspense fallback={<Loader />}>
        <Component {...props} />
      </React.Suspense>
    );
  };

  return SuspenseComponent;
};

export default withSuspense;
