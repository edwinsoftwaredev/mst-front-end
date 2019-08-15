import { trigger, transition, query, animateChild, group, animate, style } from '@angular/animations';

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
      ]), // es necesario para que la animacion funcione
      group([
        query(':enter', [
          style({ // define el estilo inicial del componente cuando inicia la animacion
            transform: 'translateY(50%)',
            opacity: '0'
          }),
          animate('300ms ease-in', style({
            transform: 'translateY(0%)',
            opacity: '1'
          }))
        ]),
        query(':leave', [
          style({ // define el estilo inicial del componente cuando inicia la animacion
            transform: 'translateY(0%)'
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
      ]), // es necesario para que la animacion funcione
      group([
        query(':enter', [
          style({ // define el estilo inicial del componente cuando inicia la animacion
            transform: 'translateY(-50%)',
            opacity: '0'
          }),
          animate('300ms ease-in', style({
            transform: 'translateY(0%)',
            opacity: '1'
          }))
        ]),
        query(':leave', [
          style({ // define el estilo inicial del componente cuando inicia la animacion
            transform: 'translateY(0%)'
          }),
          animate('300ms ease-out', style({
            transform: 'translateY(50%)',
            opacity: '0'
          }))
        ])
      ])
    ])
  ]);
