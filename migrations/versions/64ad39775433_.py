"""empty message

Revision ID: 64ad39775433
Revises: 89c0751e91a2
Create Date: 2018-05-21 16:57:07.867501

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64ad39775433'
down_revision = '89c0751e91a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_catalog_value2', table_name='catalog')
    op.drop_column('catalog', 'value2')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('catalog', sa.Column('value2', sa.VARCHAR(length=500), autoincrement=False, nullable=True))
    op.create_index('ix_catalog_value2', 'catalog', ['value2'], unique=False)
    # ### end Alembic commands ###
