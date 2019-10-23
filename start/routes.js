'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.put('users/:id', 'UserController.update')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]]))
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])

Route.resource('permissions', 'PermissionController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || modarator)'])

Route.resource('permissions', 'PermissionController')
  .apiOnly()
  .only(['index', 'show'])
  .middleware(['auth', 'can:(read_post || read_private_post)']) // role criada

Route.resource('roles', 'RoleController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || modarator)'])

Route.resource('roles', 'RoleController')
  .apiOnly()
  .only(['index', 'show'])
  .middleware(['auth'])
