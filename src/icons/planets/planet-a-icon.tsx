import React, { FunctionComponent } from 'react';
import { IconProps } from '../models';
import { complimentary } from '../../shared/utils/hsl';

const PlanetIcon: FunctionComponent<IconProps> = ({
  color = '',
  inputRef,
  size = 100
}) => {
  const ring = complimentary(color); // original #e19748
  return (
    <svg
      role="img"
      preserveAspectRatio="xMidYMid meet"
      // style={iconStyle()}
      ref={inputRef ? inputRef : null}
      viewBox="0 0 68.30603 54.312466"
      height={size}
      width={size}
    >
      <defs id="defs6485">
        <clipPath id="clipPath5198" clipPathUnits="userSpaceOnUse">
          <path
            id="path5196"
            d="M 82.7245,425.514 H 125.359 V 382.879 H 82.7245 Z"
          />
        </clipPath>
        <clipPath id="clipPath5182" clipPathUnits="userSpaceOnUse">
          <path
            id="path5180"
            d="M 71.2745,439.953 H 186.103 V 325.124 H 71.2745 Z"
          />
        </clipPath>
        <clipPath id="clipPath5166" clipPathUnits="userSpaceOnUse">
          <path
            id="path5164"
            d="M 74.7157,434.127 H 159.872 V 348.971 H 74.7157 Z"
          />
        </clipPath>
        <clipPath id="clipPath5114" clipPathUnits="userSpaceOnUse">
          <path
            id="path5112"
            d="m 71.275,382.539 c 0,-31.709 25.705,-57.415 57.413,-57.415 v 0 c 31.71,0 57.415,25.706 57.415,57.415 v 0 c 0,31.708 -25.705,57.413 -57.415,57.413 v 0 c -31.708,0 -57.413,-25.705 -57.413,-57.413"
          />
        </clipPath>
        <clipPath id="clipPath5066" clipPathUnits="userSpaceOnUse">
          <path id="path5064" d="M 0,500 H 500 V 0 H 0 Z" />
        </clipPath>
        <clipPath id="clipPath5078" clipPathUnits="userSpaceOnUse">
          <path
            id="path5076"
            d="M 61.5231,449.704 H 195.854 V 315.373 H 61.5231 Z"
          />
        </clipPath>
        <clipPath id="clipPath5094" clipPathUnits="userSpaceOnUse">
          <path
            id="path5092"
            d="M 51.7105,459.517 H 205.667 V 305.56 H 51.7105 Z"
          />
        </clipPath>
      </defs>

      <g transform="translate(557.27206,-31.718769)" id="layer1">
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-568.51756,193.82601)"
          id="g5060"
        >
          <g clip-path="url(#clipPath5066)" id="g5062">
            <g transform="translate(33.3774,377.8042)" id="g5068">
              <path
                id="path5070"
                style={{
                  fill: 'none',
                  stroke: ring,
                  strokeWidth: 3,
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 10,
                  strokeDasharray: 'none',
                  strokeOpacity: 1
                }}
                d="M 0,0 C 0,3.866 42.672,7 95.311,7 147.95,7 190.623,3.866 190.623,0"
              />
            </g>
            <g id="g5072">
              <g id="g5074" />
              <g id="g5086">
                <g
                  style={{ opacity: 0.05000311 }}
                  id="g5084"
                  clip-path="url(#clipPath5078)"
                >
                  <g id="g5082" transform="translate(195.8545,382.5386)">
                    <path
                      id="path5080"
                      style={{
                        fill: '#ffffff',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c 0,-37.095 -30.071,-67.166 -67.166,-67.166 -37.094,0 -67.166,30.071 -67.166,67.166 0,37.094 30.072,67.166 67.166,67.166 C -30.071,67.166 0,37.094 0,0"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g5088">
              <g id="g5090" />
              <g id="g5102">
                <g
                  style={{ opacity: 0.05000311 }}
                  id="g5100"
                  clip-path="url(#clipPath5094)"
                >
                  <g id="g5098" transform="translate(205.667,382.5386)">
                    <path
                      id="path5096"
                      style={{
                        fill: '#ffffff',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c 0,-42.514 -34.464,-76.979 -76.979,-76.979 -42.513,0 -76.978,34.465 -76.978,76.979 0,42.514 34.465,76.978 76.978,76.978 C -34.464,76.978 0,42.514 0,0"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(186.103,382.5386)" id="g5104">
              <path
                id="path5106"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 0,-31.709 -25.705,-57.415 -57.415,-57.415 -31.709,0 -57.414,25.706 -57.414,57.415 0,31.709 25.705,57.414 57.414,57.414 C -25.705,57.414 0,31.709 0,0"
              />
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-568.51756,193.82601)"
          id="g5108"
        >
          <g clip-path="url(#clipPath5114)" id="g5110">
            <g transform="translate(46.6704,421.2681)" id="g5116">
              <path
                id="path5118"
                style={{
                  fill: 'none',
                  stroke: '#f4c889',
                  strokeWidth: 5,
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 10,
                  strokeDasharray: 'none',
                  strokeOpacity: 1
                }}
                d="M 0,0 C 43.342,-0.25 98.925,-0.259 129.925,35.733"
              />
            </g>
            <g transform="translate(83.3545,405.1577)" id="g5120">
              <path
                id="path5122"
                style={{
                  fill: '#a4d3e5',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 27.752,1.402 56.21,4.951 80.593,18.279 7.24,3.958 14.118,8.774 21.984,11.267 4.834,1.532 11.204,1.587 13.776,-2.782 2.523,-4.288 -0.432,-9.715 -3.836,-13.343 -8.539,-9.098 -20.11,-14.629 -31.393,-19.955 -7.272,-3.432 -14.569,-6.875 -22.228,-9.324 -8.456,-2.704 -17.253,-4.165 -26.034,-5.479 -8.926,-1.336 -17.875,-2.529 -26.841,-3.577 -5.083,-0.594 -20.579,-4.96 -24.635,-1.407 -3.208,2.809 -0.357,12.509 0.833,15.825 C -14.763,-2.091 -8.342,-0.421 0,0"
              />
            </g>
            <g transform="translate(185.3398,380.5908)" id="g5124">
              <path
                id="path5126"
                style={{
                  fill: '#a4d3e5',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 5.357,1.838 12.616,2.879 15.5,-1.996 2.981,-5.039 -1.879,-11.082 -6.671,-14.447 -9.536,-6.696 -20.4,-11.203 -31.166,-15.656 -25.517,-10.554 -49.525,-18.57 -77.35,-17.991 -3.516,0.073 -7.969,0.859 -8.761,4.285 -0.737,3.19 2.481,5.872 5.499,7.142 7.783,3.275 16.328,2.982 24.448,4.804 7.977,1.789 15.493,5.194 22.675,8.993 C -37.808,-15.333 -19.301,-6.623 0,0"
              />
            </g>
            <g transform="translate(71.2891,330.9624)" id="g5128">
              <path
                id="path5130"
                style={{
                  fill: 'none',
                  stroke: '#f4c889',
                  strokeWidth: 5,
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 10,
                  strokeDasharray: 'none',
                  strokeOpacity: 1
                }}
                d="m 0,0 c 22.509,-2.309 48.216,-3.05 68.397,8.609 4.04,2.333 7.854,5.077 12.078,7.059 9.633,4.522 20.83,4.829 30.452,9.376 5.277,2.494 9.958,6.24 13.547,10.842"
              />
            </g>
            <g transform="translate(45.9395,407.186)" id="g5132">
              <path
                id="path5134"
                style={{
                  fill: 'none',
                  stroke: '#f4c889',
                  strokeWidth: 7,
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 10,
                  strokeDasharray: 'none',
                  strokeOpacity: 1
                }}
                d="M 0,0 C 47.158,-7.554 96.976,2.896 137.123,28.764"
              />
            </g>
            <g transform="translate(93.4326,380.1514)" id="g5136">
              <path
                id="path5138"
                style={{
                  fill: '#f4c889',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 4.153,-0.094 8.3,-0.363 12.422,-0.895 11.095,-1.43 22.528,-4.715 33.22,-1.429 3.857,1.186 7.412,3.185 10.824,5.34 7.435,4.695 14.328,10.186 21.717,14.951 7.703,4.967 16.283,6.658 24.999,9.364 3.578,1.111 7.591,2.677 8.874,6.198 0.203,0.555 0.322,1.182 0.101,1.731 -0.28,0.694 -1.017,1.074 -1.71,1.36 -6.06,2.504 -12.975,2.253 -19.317,0.584 C 81.223,34.597 72.359,29.469 62.323,27.068 52.314,24.673 41.799,23.974 32.302,19.737 29.411,18.448 26.668,16.846 23.783,15.544 15.828,11.957 6.996,11.507 -1.542,10.481 -12.724,9.138 -24.322,6.77 -34.32,1.383 c -3.716,-2.002 -6.826,-4.508 -9.599,-7.677 -0.68,-0.777 -2.777,-2.334 -2.438,-3.582 1.158,-4.264 8.264,1.946 9.557,3.07 3.025,2.631 6.012,4.265 10.003,5.56 5.513,1.788 12.922,1.099 18.698,1.232 C -5.4,0.048 -2.699,0.061 0,0"
              />
            </g>
            <g transform="translate(103.0239,336.2393)" id="g5140">
              <path
                id="path5142"
                style={{
                  fill: '#f4c889',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c -0.503,-0.206 -1.008,-0.408 -1.514,-0.607 -11.864,-4.669 -24.999,-7.445 -37.382,-4.402 -7.954,1.954 -13.264,13.164 -9.392,20.682 2.426,4.709 7.168,7.802 12.057,9.841 12.489,5.21 26.272,4.698 39.527,4.408 13.6,-0.298 25.546,0.067 38.109,5.757 10.496,4.755 19.513,12.188 29.303,18.266 3.338,2.073 32.339,16.851 27.609,3.237 C 97.461,54.718 95.288,52.989 93.218,51.401 88.19,47.544 83.162,43.686 78.134,39.828 70.845,34.235 63.5,28.607 55.294,24.473 48.185,20.892 40.549,18.494 33.192,15.452 21.911,10.789 11.295,4.615 0,0"
              />
            </g>
            <g transform="translate(107.9453,354.1113)" id="g5144">
              <path
                id="path5146"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 0.555,-0.161 1.146,-0.361 1.482,-0.831 0.771,-1.073 -0.316,-2.49 -1.365,-3.295 -8.973,-6.893 -21.039,-8.614 -32.284,-7.362 -0.297,0.033 -0.611,0.075 -0.842,0.265 -0.358,0.293 -0.387,0.824 -0.348,1.284 C -32.21,3.585 -8.825,2.558 0,0"
              />
            </g>
            <g transform="translate(145.4165,395.6597)" id="g5148">
              <path
                id="path5150"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 0.221,-0.016 0.456,-0.039 0.628,-0.167 0.427,-0.318 0.143,-0.945 -0.18,-1.353 -4.782,-6.04 -13.022,-9.657 -21.177,-9.296 -0.614,0.027 -1.271,0.091 -1.742,0.454 -0.565,0.435 -0.7,1.205 -0.526,1.861 0.935,3.508 6.032,5.426 9.344,6.614 C -9.334,-0.337 -4.629,0.336 0,0"
              />
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-568.51756,193.82601)"
          id="g5160"
        >
          <g id="g5162" />
          <g id="g5174">
            <g
              style={{ opacity: 0.14999402 }}
              id="g5172"
              clip-path="url(#clipPath5166)"
            >
              <g id="g5170" transform="translate(159.8716,391.5493)">
                <path
                  id="path5168"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-23.516 -19.062,-42.578 -42.578,-42.578 -23.515,0 -42.578,19.062 -42.578,42.578 0,23.515 19.063,42.578 42.578,42.578 C -19.062,42.578 0,23.515 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-568.51756,193.82601)"
          id="g5176"
        >
          <g id="g5178" />
          <g id="g5190">
            <g
              style={{ opacity: 0.14999402 }}
              id="g5188"
              clip-path="url(#clipPath5182)"
            >
              <g id="g5186" transform="translate(128.6885,439.9526)">
                <path
                  id="path5184"
                  style={{
                    fill: '#231f20',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c -11.727,0 -22.627,-3.523 -31.715,-9.558 7.923,4.813 17.224,7.585 27.173,7.585 28.946,0 52.412,-23.466 52.412,-52.413 0,-28.947 -23.466,-52.412 -52.412,-52.412 -28.947,0 -52.413,23.465 -52.413,52.412 0,2.692 0.205,5.336 0.596,7.918 -0.684,-3.545 -1.055,-7.201 -1.055,-10.946 0,-31.709 25.706,-57.415 57.414,-57.415 31.709,0 57.415,25.706 57.415,57.415 C 57.415,-25.705 31.709,0 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-568.51756,193.82601)"
          id="g5192"
        >
          <g id="g5194" />
          <g id="g5206">
            <g
              style={{ opacity: 0.14999402 }}
              id="g5204"
              clip-path="url(#clipPath5198)"
            >
              <g id="g5202" transform="translate(125.3584,404.1968)">
                <path
                  id="path5200"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-11.773 -9.544,-21.317 -21.317,-21.317 -11.773,0 -21.317,9.544 -21.317,21.317 0,11.773 9.544,21.317 21.317,21.317 C -9.544,21.317 0,11.773 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-489.49534,60.545085)"
          id="g5208"
        >
          <path
            id="path5210"
            style={{
              fill: 'none',
              stroke: ring,
              strokeWidth: 3,
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              strokeDasharray: 'none',
              strokeOpacity: 1
            }}
            d="m 0,0 c 0,-3.867 -42.672,-7 -95.312,-7 -52.638,0 -95.311,3.133 -95.311,7"
          />
        </g>
      </g>
    </svg>
  );
};

export default PlanetIcon;
