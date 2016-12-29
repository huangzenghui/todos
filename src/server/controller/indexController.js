const index = {
  index() {
    return async(ctx, next) => {
      return await ctx.render('index')
    }
  }
}

export default index;