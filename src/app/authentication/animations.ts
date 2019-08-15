import { trigger, transition, query, group, animate, style } from '@angular/animations';

export const loginRegisterAnimation =
  trigger('LoginRegister', [
    transition('login => register', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          height: '100%',
          display: 'flex',
          'align-items': 'center'
        })
      ]), // initial state of components
      group([
        query(':enter', [
          style({ // state of component that enters when animation start
            transform: 'translateY(50%)',
            opacity: '0'
          }),
          animate('300ms ease-in', style({
            transform: 'translateY(0%)',
            opacity: '1'
          }))
        ]),
        query(':leave', [
          style({ // state of component that leaves when animation start
            transform: 'translateY(0%)',
            opacity: '1'
          }),
          animate('300ms ease-out', style({
            transform: 'translateY(-50%)',
            opacity: '0'
          }))
        ]),
      ])
    ]),
    transition('register => login', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          height: '100%',
          display: 'flex',
          'align-items': 'center'
        })
      ]), // initial state of components
      group([
        query(':enter', [
          style({ // state of component that enters when animation start
            transform: 'translateY(-50%)',
            opacity: '0'
          }),
          animate('300ms ease-in', style({
            transform: 'translateY(0%)',
            opacity: '1'
          }))
        ]),
        query(':leave', [
          style({ // state of component that leaves when animation start
            transform: 'translateY(0%)',
            opacity: '1'
          }),
          animate('300ms ease-out', style({
            transform: 'translateY(50%)',
            opacity: '0'
          }))
        ])
      ])
    ])
  ]);
