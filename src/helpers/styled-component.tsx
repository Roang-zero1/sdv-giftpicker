import * as React from 'react';

export function ExcludeProps(SubComponent: any, filter: string[] = []) {
  return (props: {}) => {
    const picked = {};
    for (const key of Object.keys(props)) {
      if (filter.indexOf(key) === -1) {
        picked[key] = props[key];
      }
    }

    return <SubComponent {...picked} />;
  };
}
