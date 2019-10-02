import React, { FunctionComponent } from 'react';
import { IconProps } from '../models';
import { darken } from '../../shared/utils/hsl';

import satellite from './satellite.svg';
import styles from './satellite.module.scss';

const CodepenIcon: FunctionComponent<IconProps> = ({
  color = '',
  inputRef
}) => {
  return (
    <div className={styles['satellite']} ref={inputRef ? inputRef : null}>
      <img src={satellite} className={styles['base']} alt="" />
      <svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className={styles['colors']}
        width="26.382177mm"
        height="26.527187mm"
        viewBox="0 0 26.382177 26.527187"
      >
        <g transform="translate(442.76226,76.504228)" id="layer1">
          <path
            d="m -440.32489,-60.418881 c 0.0975,-0.05098 0.19827,-0.09878 0.30092,-0.14317 0.35326,-0.152748 0.71554,-0.257123 1.07893,-0.316247 -0.89768,3.201168 0.54542,6.538614 3.49258,8.07729 -0.29198,0.224263 -0.61618,0.416712 -0.96944,0.56946 -0.10298,0.04453 -0.20652,0.08505 -0.31076,0.121307 -2.75856,-1.802019 -4.16917,-5.064344 -3.5923,-8.308593"
            style={{
              fill: color,
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path846"
          />
          <path
            d="m -440.02397,-60.562063 c 0.35326,-0.152748 0.71554,-0.257123 1.07907,-0.315921 -0.16413,0.584835 -0.24997,1.173867 -0.26292,1.756367 -0.48468,0.42481 -0.86651,0.943508 -1.12949,1.51574 -0.15521,-0.914504 -0.15628,-1.864521 0.0124,-2.813004 0.0975,-0.05098 0.19794,-0.09864 0.30092,-0.14317"
            style={{
              fill: darken(color, 20),
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path852"
          />
          <path
            d="m -437.39752,-52.136785 0.0253,-0.413367 -1.23737,-0.119504 c -0.21533,0.0051 -0.38829,0.173994 -0.40236,0.384985 l 1.61439,0.147886"
            style={{
              fill: darken(color, 14),
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path854"
          />
          <path
            d="m -438.58956,-51.843889 1.16815,0.09985 0.0239,-0.392749 -1.61439,-0.147886 -8.8e-4,0.03804 c 0.005,0.227851 0.19501,0.408409 0.42321,0.40275"
            style={{
              fill: color,
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path860"
          />
          <path
            d="m -440.74911,-59.888003 0.31867,0.265001 -0.7605,0.983375 c -0.1512,0.1534 -0.39289,0.163346 -0.55609,0.02945 l 0.99792,-1.277823"
            style={{
              fill: darken(color, 14),
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path862"
          />
          <path
            d="m -441.77887,-59.21982 0.72725,-0.919804 0.30251,0.251621 -0.99792,1.277823 -0.0283,-0.02542 c -0.16239,-0.160389 -0.16398,-0.421823 -0.004,-0.584205"
            style={{
              fill: color,
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path868"
          />
          <path
            d="m -436.92442,-56.912743 0.19608,0.364518 -1.07288,0.62802 c -0.19742,0.08565 -0.42531,0.0048 -0.52658,-0.180483 l 1.4034,-0.812063"
            style={{
              fill: darken(color, 14),
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path870"
          />
          <path
            d="m -438.12979,-56.678262 1.01859,-0.581106 0.18681,0.346614 -1.40339,0.812058 -0.0168,-0.03386 c -0.0906,-0.209499 0.005,-0.452722 0.21462,-0.543632"
            style={{
              fill: color,
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none',
              strokeWidth: 0.03527778
            }}
            id="path876"
          />
        </g>
      </svg>
    </div>
  );
};

export default CodepenIcon;
