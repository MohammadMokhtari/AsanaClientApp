import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeAnimation = trigger('routAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          right: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '600ms ease',
          style({
            opacity: 1,
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
