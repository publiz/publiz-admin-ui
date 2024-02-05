// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as TagsIndexImport } from './routes/tags/index'
import { Route as PostsIndexImport } from './routes/posts/index'
import { Route as OrganizationsIndexImport } from './routes/organizations/index'
import { Route as MetaSchemasIndexImport } from './routes/meta-schemas/index'
import { Route as FilesIndexImport } from './routes/files/index'
import { Route as TagsCreateImport } from './routes/tags/create'
import { Route as OrganizationsCreateImport } from './routes/organizations/create'
import { Route as OrganizationsIdImport } from './routes/organizations/$id'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const TagsIndexRoute = TagsIndexImport.update({
  path: '/tags/',
  getParentRoute: () => rootRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationsIndexRoute = OrganizationsIndexImport.update({
  path: '/organizations/',
  getParentRoute: () => rootRoute,
} as any)

const MetaSchemasIndexRoute = MetaSchemasIndexImport.update({
  path: '/meta-schemas/',
  getParentRoute: () => rootRoute,
} as any)

const FilesIndexRoute = FilesIndexImport.update({
  path: '/files/',
  getParentRoute: () => rootRoute,
} as any)

const TagsCreateRoute = TagsCreateImport.update({
  path: '/tags/create',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationsCreateRoute = OrganizationsCreateImport.update({
  path: '/organizations/create',
  getParentRoute: () => rootRoute,
} as any)

const OrganizationsIdRoute = OrganizationsIdImport.update({
  path: '/organizations/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/organizations/$id': {
      preLoaderRoute: typeof OrganizationsIdImport
      parentRoute: typeof rootRoute
    }
    '/organizations/create': {
      preLoaderRoute: typeof OrganizationsCreateImport
      parentRoute: typeof rootRoute
    }
    '/tags/create': {
      preLoaderRoute: typeof TagsCreateImport
      parentRoute: typeof rootRoute
    }
    '/files/': {
      preLoaderRoute: typeof FilesIndexImport
      parentRoute: typeof rootRoute
    }
    '/meta-schemas/': {
      preLoaderRoute: typeof MetaSchemasIndexImport
      parentRoute: typeof rootRoute
    }
    '/organizations/': {
      preLoaderRoute: typeof OrganizationsIndexImport
      parentRoute: typeof rootRoute
    }
    '/posts/': {
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof rootRoute
    }
    '/tags/': {
      preLoaderRoute: typeof TagsIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  OrganizationsIdRoute,
  OrganizationsCreateRoute,
  TagsCreateRoute,
  FilesIndexRoute,
  MetaSchemasIndexRoute,
  OrganizationsIndexRoute,
  PostsIndexRoute,
  TagsIndexRoute,
  UsersIndexRoute,
])
