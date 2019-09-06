import React, { FunctionComponent } from 'react';
import { IconProps } from '../models';

const PlanetIcon: FunctionComponent<IconProps> = ({
  color = '',
  inputRef,
  size = 100
}) => {
  return (
    <svg
      role="img"
      preserveAspectRatio="xMidYMid meet"
      // style={iconStyle()}
      ref={inputRef ? inputRef : null}
      viewBox="0 0 19.698935 19.699076"
      height={size}
      width={size}
    >
      <defs id="defs7341">
        <clipPath id="clipPath6186" clipPathUnits="userSpaceOnUse">
          <path id="path6184" d="M 0,500 H 500 V 0 H 0 Z" />
        </clipPath>
        <clipPath id="clipPath6194" clipPathUnits="userSpaceOnUse">
          <path
            id="path6192"
            d="m 310.775,104.573 h 30.886 V 73.6866 h -30.886 z"
          />
        </clipPath>
        <clipPath id="clipPath6210" clipPathUnits="userSpaceOnUse">
          <path
            id="path6208"
            d="m 309.526,106.686 h 41.649 V 65.0373 h -41.649 z"
          />
        </clipPath>
        <clipPath id="clipPath6226" clipPathUnits="userSpaceOnUse">
          <path
            id="path6224"
            d="m 313.679,101.449 h 15.464 V 85.9853 h -15.464 z"
          />
        </clipPath>
        <clipPath id="clipPath6118" clipPathUnits="userSpaceOnUse">
          <path
            id="path6116"
            d="m 309.526,85.861 c 0,-11.5 9.323,-20.824 20.824,-20.824 v 0 c 11.502,0 20.825,9.324 20.825,20.824 v 0 c 0,11.501 -9.323,20.824 -20.825,20.824 v 0 c -11.501,0 -20.824,-9.323 -20.824,-20.824"
          />
        </clipPath>
        <clipPath id="clipPath6098" clipPathUnits="userSpaceOnUse">
          <path
            id="path6096"
            d="m 302.431,113.782 h 55.84 V 57.9414 h -55.84 z"
          />
        </clipPath>
        <clipPath id="clipPath6082" clipPathUnits="userSpaceOnUse">
          <path
            id="path6080"
            d="m 305.99,110.223 h 48.722 V 61.5005 H 305.99 Z"
          />
        </clipPath>
      </defs>

      <g transform="translate(359.09947,-73.971887)" id="layer1">
        <g
          id="g6076"
          transform="matrix(0.35277777,0,0,-0.35277777,-465.7904,114.1114)"
        >
          <g id="g6078" />
          <g id="g6090">
            <g
              style={{ opacity: 0.05000311 }}
              id="g6088"
              clip-path="url(#clipPath6082)"
            >
              <g id="g6086" transform="translate(354.7119,85.8613)">
                <path
                  id="path6084"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-13.454 -10.907,-24.36 -24.361,-24.36 -13.454,0 -24.362,10.906 -24.362,24.36 0,13.454 10.908,24.361 24.362,24.361 C -10.907,24.361 0,13.454 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          id="g6092"
          transform="matrix(0.35277777,0,0,-0.35277777,-465.7904,114.1114)"
        >
          <g id="g6094" />
          <g id="g6106">
            <g
              style={{ opacity: 0.05000311 }}
              id="g6104"
              clip-path="url(#clipPath6098)"
            >
              <g id="g6102" transform="translate(358.2705,85.8613)">
                <path
                  id="path6100"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-15.42 -12.5,-27.92 -27.92,-27.92 -15.42,0 -27.92,12.5 -27.92,27.92 0,15.42 12.5,27.92 27.92,27.92 C -12.5,27.92 0,15.42 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-341.90374,83.821446)"
          id="g6108"
        >
          <path
            id="path6110"
            style={{
              fill: '#eaa757',
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none'
            }}
            d="m 0,0 c 0,-11.501 -9.323,-20.824 -20.824,-20.824 -11.501,0 -20.824,9.323 -20.824,20.824 0,11.501 9.323,20.824 20.824,20.824 C -9.323,20.824 0,11.501 0,0"
          />
        </g>
        <g
          id="g6112"
          transform="matrix(0.35277777,0,0,-0.35277777,-465.7904,114.1114)"
        >
          <g clip-path="url(#clipPath6118)" id="g6114">
            <g transform="translate(361.9072,75.7822)" id="g6120">
              <path
                id="path6122"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 0.757,-0.914 1.031,-2.165 0.453,-3.986 -0.413,-1.301 -1.313,-2.4 -2.352,-3.284 -4.185,-3.559 -9.505,-3.446 -14.596,-3.848 -5.958,-0.471 -11.642,-2.653 -17.657,-2.674 -0.486,-10e-4 -1.013,0.023 -1.386,0.333 -0.548,0.455 -0.503,1.362 -0.079,1.934 0.424,0.572 1.112,0.877 1.785,1.108 1.686,0.579 3.847,1.251 4.022,3.025 0.082,0.827 -0.344,1.666 -0.142,2.471 0.275,1.096 1.547,1.606 2.162,2.553 0.649,1 0.47,2.308 0.22,3.474 -0.249,1.166 -0.535,2.425 -0.049,3.513 0.487,1.089 2.143,1.68 2.886,0.746 0.562,-0.708 0.362,-1.939 1.145,-2.39 0.416,-0.24 0.943,-0.137 1.407,-0.26 1.159,-0.308 1.48,-1.824 1.287,-3.008 -0.191,-1.183 -0.666,-2.409 -0.263,-3.538 0.573,-1.606 2.805,-2.128 4.306,-1.318 1.5,0.809 2.304,2.531 2.554,4.217 0.25,1.687 0.048,3.405 0.069,5.109 0.013,0.97 0.207,2.112 1.079,2.542 0.799,0.394 1.776,-0.043 2.421,-0.658 C -10.082,5.445 -9.609,4.653 -8.9,4.112 -6.731,2.456 -1.879,2.269 0,0"
              />
            </g>
            <g transform="translate(314.5439,109.0381)" id="g6124">
              <path
                id="path6126"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 3.433,1.103 7.128,0.926 10.728,0.722 1.053,-0.06 2.251,-0.197 2.87,-1.052 0.86,-1.19 0.015,-2.858 0.246,-4.309 0.247,-1.552 1.657,-2.594 2.76,-3.715 1.102,-1.122 1.979,-2.938 1.032,-4.193 -1.092,0.086 -1.79,1.15 -2.448,2.026 -0.657,0.875 -1.764,1.735 -2.747,1.251 -1.183,-0.582 -0.878,-2.378 -1.559,-3.507 -0.662,-1.1 -2.138,-1.364 -3.421,-1.326 -1.283,0.039 -2.636,0.254 -3.799,-0.291 -1.274,-0.597 -2.031,-2.133 -1.726,-3.507 0.319,-1.448 1.665,-2.506 3.105,-2.851 1.441,-0.345 2.959,-0.089 4.384,0.318 1.347,0.385 2.657,0.905 3.901,1.549 1.257,0.651 2.468,1.436 3.837,1.791 1.37,0.356 2.987,0.189 3.953,-0.846 1.242,-1.332 0.693,-3.856 -0.992,-4.55 -1.8,-0.741 -4.164,0.408 -5.669,-0.826 -0.84,-0.689 -1.053,-1.876 -1.101,-2.96 -0.098,-2.169 0.238,-4.356 0.982,-6.395 -1.589,-0.479 -3.256,0.319 -4.701,1.134 -1.446,0.815 -3.033,1.702 -4.665,1.4 -1.632,-0.301 -2.865,-2.527 -1.661,-3.67 1.328,-1.261 3.513,0.22 5.312,-0.128 1.746,-0.337 2.678,-2.432 2.385,-4.187 -0.36,-2.155 -3.572,-7.357 -5.972,-7.653 -0.969,-0.12 -1.917,0.322 -2.753,0.827 -3.614,2.183 -6.276,5.764 -7.735,9.726 -0.861,2.339 -1.32,4.809 -1.466,7.293 -0.098,1.671 0.777,4.777 -0.001,6.236 -0.13,0.244 -0.336,0.455 -0.387,0.726 -0.157,0.832 1.112,1.192 1.423,1.978 0.098,0.247 0.092,0.52 0.085,0.785 -0.015,0.569 -0.031,1.14 -0.047,1.709 -0.042,1.555 -0.114,3.957 -1.328,5.079 -0.872,0.807 -2.144,0.964 -3.229,1.45 -2.22,0.994 -1.827,2.404 -0.406,3.308 1.81,1.149 3.768,1.626 5.415,3.056 C -3.653,-2.088 -2.3,-0.739 0,0"
              />
            </g>
            <g transform="translate(346.9355,105.002)" id="g6128">
              <path
                id="path6130"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 7.306,-1.24 12.388,-11.663 8.193,-18.106 -0.231,-0.357 -0.494,-0.708 -0.856,-0.931 -1.063,-0.655 -2.483,0.061 -3.253,1.045 -0.77,0.983 -1.192,2.218 -2.044,3.13 -0.853,0.913 -2.45,1.365 -3.307,0.456 -0.687,-0.731 -0.565,-1.983 -1.275,-2.693 -0.514,-0.514 -1.321,-0.589 -2.044,-0.512 -0.334,0.036 -0.678,0.102 -0.948,0.302 -0.903,0.666 -0.366,2.08 -0.513,3.194 -0.167,1.276 -1.323,2.2 -2.51,2.7 -1.186,0.5 -2.488,0.724 -3.613,1.35 -0.22,0.121 -0.437,0.264 -0.569,0.478 -0.472,0.762 0.409,1.626 1.162,2.111 1.174,0.757 2.463,2.042 1.914,3.327 -0.171,0.398 -0.497,0.705 -0.751,1.055 -2.366,3.259 1.397,5.76 4.324,5.555 C -3.887,2.307 -2.223,0.377 0,0"
              />
            </g>
            <g transform="translate(341.8906,83.9502)" id="g6132">
              <path
                id="path6134"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c -3.882,-0.213 1.219,-4.425 0.606,-5.229 0.495,-0.395 1.283,-0.106 1.632,0.42 0.35,0.528 0.381,1.196 0.402,1.828 0.028,0.898 0.04,1.861 -0.455,2.61 -0.497,0.749 -1.707,1.078 -2.291,0.396"
              />
            </g>
            <g transform="translate(320.6768,93.749)" id="g6136">
              <path
                id="path6138"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c -3.535,-2.024 0.48,-4.633 3.029,-3.106 0.835,0.5 1.333,1.673 0.797,2.485 C 3.539,-0.188 3.035,0.048 2.535,0.187 1.697,0.423 0.756,0.432 0,0"
              />
            </g>
            <g transform="translate(330.9082,85.1084)" id="g6140">
              <path
                id="path6142"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.709,0.081 1.439,-0.276 1.783,-1.339 2.473,-3.463 -0.153,-4.741 -1.414,-2.908 -2.351,-1.546 -1.207,-0.137 0,0"
              />
            </g>
            <g transform="translate(327.6953,70.3447)" id="g6144">
              <path
                id="path6146"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.341,0.038 0.692,-0.134 0.857,-0.645 1.189,-1.666 -0.074,-2.281 -0.681,-1.399 -1.132,-0.744 -0.581,-0.066 0,0"
              />
            </g>
            <g transform="translate(320.2998,77.2412)" id="g6148">
              <path
                id="path6150"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.341,0.039 0.692,-0.133 0.858,-0.645 1.189,-1.666 -0.073,-2.281 -0.68,-1.399 -1.131,-0.744 -0.581,-0.066 0,0"
              />
            </g>
            <g transform="translate(330.9443,77.2412)" id="g6152">
              <path
                id="path6154"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.341,0.039 0.692,-0.133 0.858,-0.645 1.189,-1.666 -0.074,-2.281 -0.681,-1.399 -1.131,-0.744 -0.581,-0.066 0,0"
              />
            </g>
            <g transform="translate(334.0303,103.0684)" id="g6156">
              <path
                id="path6158"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.342,0.039 0.692,-0.133 0.858,-0.644 1.189,-1.666 -0.073,-2.28 -0.68,-1.399 -1.131,-0.743 -0.581,-0.065 0,0"
              />
            </g>
            <g transform="translate(328.208,93.832)" id="g6160">
              <path
                id="path6162"
                style={{
                  fill: color,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 1.486,-0.54 2.674,1.494 1.699,2.646 0.019,4.629 -2.644,0.961 0,0"
              />
            </g>
            <g transform="translate(339.9512,95.4893)" id="g6164">
              <path
                id="path6166"
                style={{
                  fill: '#efa557',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 1.487,-0.54 2.675,1.493 1.699,2.646 0.019,4.629 -2.644,0.96 0,0"
              />
            </g>
            <g transform="translate(321.6357,85.334)" id="g6168">
              <path
                id="path6170"
                style={{
                  fill: '#efa557',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.808,0.146 1.803,0.061 2.213,-0.649 2.583,-1.291 2.247,-2.159 1.651,-2.599 -0.808,-4.412 -3.752,-0.68 0,0"
              />
            </g>
            <g transform="translate(313.5439,89.6289)" id="g6172">
              <path
                id="path6174"
                style={{
                  fill: '#efa557',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="M 0,0 C 0.295,-0.875 0.887,-1.614 1.299,-2.44 1.71,-3.268 1.922,-4.301 1.44,-5.088 1.202,-5.478 0.812,-5.773 0.653,-6.202 c -0.429,-1.166 1.081,-2.431 0.586,-3.57 -0.111,-0.255 -0.312,-0.46 -0.527,-0.637 -1.252,-1.025 -3.044,-1.201 -4.606,-0.782 -1.562,0.419 -2.93,1.362 -4.172,2.398 -1.105,0.92 -2.184,2.005 -2.533,3.4 -0.196,0.789 -0.141,1.622 0.035,2.414 0.469,2.109 1.918,4.059 3.792,5.139 C -4.879,3.253 -0.719,2.137 0,0"
              />
            </g>
            <g transform="translate(355.6846,91.2871)" id="g6176">
              <path
                id="path6178"
                style={{
                  fill: '#efa557',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 1.618,2.053 0.479,4.144 0.981,6.429 0.103,0.465 0.192,0.942 0.131,1.415 -0.114,0.885 -0.73,1.614 -1.349,2.257 -0.445,0.46 -1.01,0.941 -1.641,0.835 C -2.438,10.841 -2.816,10.31 -3.021,9.78 -3.422,8.74 -3.623,8.162 -4.563,7.499 -5.169,7.072 -5.904,6.882 -6.611,6.659 -8.223,6.151 -9.926,5.267 -10.455,3.662 -10.546,3.387 -10.584,3.047 -10.383,2.838 -10.201,2.65 -9.906,2.65 -9.646,2.641 -8.505,2.6 -7.387,2.115 -6.577,1.312 -5.825,0.565 -5.323,-0.446 -4.427,-1.01 -3.023,-1.893 -1.026,-1.303 0,0"
              />
            </g>
          </g>
        </g>
        <g
          id="g6180"
          transform="matrix(0.35277777,0,0,-0.35277777,-465.7904,114.1114)"
        >
          <g clip-path="url(#clipPath6186)" id="g6182">
            <g id="g6188">
              <g id="g6190" />
              <g id="g6202">
                <g
                  style={{ opacity: 0.14999402 }}
                  id="g6200"
                  clip-path="url(#clipPath6194)"
                >
                  <g id="g6198" transform="translate(341.6611,89.1299)">
                    <path
                      id="path6196"
                      style={{
                        fill: '#ffffff',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c 0,-8.529 -6.914,-15.443 -15.443,-15.443 -8.53,0 -15.444,6.914 -15.444,15.443 0,8.529 6.914,15.443 15.444,15.443 C -6.914,15.443 0,8.529 0,0"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g6204">
              <g id="g6206" />
              <g id="g6218">
                <g
                  style={{ opacity: 0.14999402 }}
                  id="g6216"
                  clip-path="url(#clipPath6210)"
                >
                  <g id="g6214" transform="translate(330.3506,106.6855)">
                    <path
                      id="path6212"
                      style={{
                        fill: '#231f20',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c -4.253,0 -8.207,-1.277 -11.503,-3.467 2.874,1.746 6.247,2.751 9.856,2.751 10.499,0 19.009,-8.511 19.009,-19.01 0,-10.499 -8.51,-19.009 -19.009,-19.009 -10.499,0 -19.01,8.51 -19.01,19.009 0,0.977 0.074,1.936 0.216,2.872 -0.248,-1.286 -0.383,-2.612 -0.383,-3.97 0,-11.501 9.323,-20.824 20.824,-20.824 11.501,0 20.824,9.323 20.824,20.824 C 20.824,-9.323 11.501,0 0,0"
                    />
                  </g>
                </g>
              </g>
            </g>
            <g id="g6220">
              <g id="g6222" />
              <g id="g6234">
                <g
                  style={{ opacity: 0.14999402 }}
                  id="g6232"
                  clipPath="url(#clipPath6226)"
                >
                  <g id="g6230" transform="translate(329.1426,93.7168)">
                    <path
                      id="path6228"
                      style={{
                        fill: '#ffffff',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none'
                      }}
                      d="m 0,0 c 0,-4.27 -3.461,-7.731 -7.731,-7.731 -4.271,0 -7.732,3.461 -7.732,7.731 0,4.271 3.461,7.732 7.732,7.732 C -3.461,7.732 0,4.271 0,0"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default PlanetIcon;
